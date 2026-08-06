import sharp from 'sharp';

/**
 * Lifts the decorative artwork off a printed invitation scan so it can be
 * re-laid over a generated background, with the text rendered as real,
 * editable elements instead of being baked into a picture.
 *
 * Off-the-shelf background removal does not work here. Models trained on
 * photographic subjects see a sheet of paper rather than a floral cluster and
 * either keep the whole page or almost none of it. What makes the problem
 * tractable is that we are not solving it in general: the vision pass reports
 * which region the artwork occupies, and inside a known region the classes
 * separate on measured properties of this kind of print:
 *
 *   paper   neutral, chroma ≈ 0, bright
 *   script  warm, r >= g >= b, and dark (luma ≈ 100)
 *   artwork painted — either saturated, or pale but tinted (chroma 15-20)
 *
 * The luma bound on `isScript` carries more weight than its size suggests.
 * Cream petals share the warm, ordered-channel signature of brown lettering,
 * so without it every white lily is classified as text and silently dropped.
 */

/** Region of the source that holds one ornament, as fractions of the image. */
export type OrnamentRegion = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type OrnamentExtraction = {
  /** Cut-out artwork with a transparent background. */
  webp: Buffer;
  png: Buffer;
  /** Pixel bounds of the artwork within the source. */
  box: { x: number; y: number; width: number; height: number };
  /** Fractional placement, so the ornament scales with its container. */
  placement: { left: number; top: number; width: number; height: number };
  /**
   * Where the artwork actually covers the sheet, as a coarse occupancy grid of
   * the full image in fractional coordinates.
   *
   * The bounding box alone is misleading for layout: a corner spray is mostly
   * transparent inside its own box, so text placed against the box edge looks
   * needlessly cramped, while text placed by eye collides with the petals that
   * do reach across. This grid is what lets the layout ask the useful question
   * — "is this specific spot free?" — instead of guessing.
   */
  coverage: {
    cols: number;
    rows: number;
    /** Row-major opaque-pixel ratio per cell, 0-1. */
    cells: number[];
  };
  stats: { seeded: number; blobs: number; keptBlobs: number; pixels: number };
};

export type OrnamentOptions = {
  /** Chroma required to start a fill. High enough to ignore lettering. */
  seedChroma?: number;
  /** Chroma required to continue one. Measured: pale petals sit at 15-20. */
  growChroma?: number;
  /** Connected areas smaller than this are speckle, not artwork. */
  minBlob?: number;
  /** Alpha softening radius, in pixels, so edges don't look die-cut. */
  feather?: number;
};

const chroma = (r: number, g: number, b: number) =>
  Math.max(r, g, b) - Math.min(r, g, b);

const luma = (r: number, g: number, b: number) => (r + g + b) / 3;

/** Brown lettering: warm, ordered channels, narrow spread — and dark. */
const isScript = (r: number, g: number, b: number) =>
  r >= g && g >= b && r - b < 78 && chroma(r, g, b) < 62 && luma(r, g, b) < 200;

const NEIGHBOURS: ReadonlyArray<readonly [number, number]> = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * The sheet's own brightness in this region, taken as the mode of the bright
 * end of the neutral histogram. Measuring beats hard-coding: scans of the same
 * design vary by several levels depending on exposure.
 */
function estimatePaperTone(
  at: (x: number, y: number) => [number, number, number],
  bx0: number,
  by0: number,
  bx1: number,
  by1: number,
): number {
  const hist = new Int32Array(256);
  for (let y = by0; y < by1; y += 2) {
    for (let x = bx0; x < bx1; x += 2) {
      const [r, g, b] = at(x, y);
      if (chroma(r, g, b) < 10) hist[Math.round(luma(r, g, b))] += 1;
    }
  }
  let best = 245;
  let bestCount = 0;
  for (let v = 200; v < 256; v += 1) {
    if (hist[v] > bestCount) {
      bestCount = hist[v];
      best = v;
    }
  }
  return best;
}

export async function extractOrnament(
  source: Buffer | string,
  region: OrnamentRegion,
  options: OrnamentOptions = {},
): Promise<OrnamentExtraction> {
  const {
    seedChroma = 32,
    growChroma = 9,
    minBlob = 3000,
    feather = 2,
  } = options;

  const { data, info } = await sharp(source)
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: CH } = info;

  const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v));
  const bx0 = clamp(Math.floor(region.left * W), 0, W - 1);
  const by0 = clamp(Math.floor(region.top * H), 0, H - 1);
  const bx1 = clamp(Math.ceil(region.right * W), bx0 + 1, W);
  const by1 = clamp(Math.ceil(region.bottom * H), by0 + 1, H);

  const at = (x: number, y: number): [number, number, number] => {
    const o = (y * W + x) * CH;
    return [data[o], data[o + 1], data[o + 2]];
  };
  const idx = (x: number, y: number) => y * W + x;

  const mask = new Uint8Array(W * H);
  const queue = new Int32Array(W * H);
  let head = 0;
  let tail = 0;

  // Seed only on confidently painted pixels inside the reported region.
  for (let y = by0; y < by1; y += 1) {
    for (let x = bx0; x < bx1; x += 1) {
      const [r, g, b] = at(x, y);
      if (
        chroma(r, g, b) >= seedChroma &&
        luma(r, g, b) < 244 &&
        !isScript(r, g, b)
      ) {
        mask[idx(x, y)] = 1;
        queue[tail] = idx(x, y);
        tail += 1;
      }
    }
  }
  const seeded = tail;

  const paperTone = estimatePaperTone(at, bx0, by0, bx1, by1);
  const shadeCut = paperTone - 6;

  // Grow across anything attached that is painted or shaded — this is what
  // walks from a stem out across the pale petal it belongs to.
  while (head < tail) {
    const p = queue[head];
    head += 1;
    const x = p % W;
    const y = (p - x) / W;
    for (const [dx, dy] of NEIGHBOURS) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < bx0 || nx >= bx1 || ny < by0 || ny >= by1) continue;
      const n = idx(nx, ny);
      if (mask[n]) continue;
      const [r, g, b] = at(nx, ny);
      if (isScript(r, g, b)) continue;

      const painted = chroma(r, g, b) >= growChroma;
      const shaded = luma(r, g, b) < shadeCut && chroma(r, g, b) >= 4;
      if (!painted && !shaded) continue;

      mask[n] = 1;
      queue[tail] = n;
      tail += 1;
    }
  }

  // Keep substantial connected artwork; drop speckle.
  const comp = new Int32Array(W * H);
  const stack = new Int32Array(W * H);
  const sizes: number[] = [0];
  let cid = 0;

  for (let y = by0; y < by1; y += 1) {
    for (let x = bx0; x < bx1; x += 1) {
      const start = idx(x, y);
      if (!mask[start] || comp[start]) continue;
      cid += 1;
      let sp = 0;
      let count = 0;
      stack[sp] = start;
      sp += 1;
      comp[start] = cid;
      while (sp > 0) {
        sp -= 1;
        const p = stack[sp];
        count += 1;
        const px = p % W;
        const py = (p - px) / W;
        for (const [dx, dy] of NEIGHBOURS) {
          const nx = px + dx;
          const ny = py + dy;
          if (nx < bx0 || nx >= bx1 || ny < by0 || ny >= by1) continue;
          const q = idx(nx, ny);
          if (mask[q] && !comp[q]) {
            comp[q] = cid;
            stack[sp] = q;
            sp += 1;
          }
        }
      }
      sizes[cid] = count;
    }
  }

  const keep = new Set<number>();
  for (let i = 1; i <= cid; i += 1) {
    if (sizes[i] >= minBlob) keep.add(i);
  }

  let minX = W;
  let minY = H;
  let maxX = -1;
  let maxY = -1;
  for (let y = by0; y < by1; y += 1) {
    for (let x = bx0; x < bx1; x += 1) {
      if (!keep.has(comp[idx(x, y)])) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) {
    throw new Error('No ornament found in the given region.');
  }

  const ow = maxX - minX + 1;
  const oh = maxY - minY + 1;
  const out = Buffer.alloc(ow * oh * 4);
  let kept = 0;

  for (let y = minY; y <= maxY; y += 1) {
    for (let x = minX; x <= maxX; x += 1) {
      if (!keep.has(comp[idx(x, y)])) continue;
      const o = ((y - minY) * ow + (x - minX)) * 4;
      const [r, g, b] = at(x, y);

      let alpha = 255;
      if (feather > 0) {
        let inside = 0;
        let total = 0;
        for (let dy = -feather; dy <= feather; dy += 1) {
          for (let dx = -feather; dx <= feather; dx += 1) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx < 0 || nx >= W || ny < 0 || ny >= H) continue;
            total += 1;
            if (keep.has(comp[idx(nx, ny)])) inside += 1;
          }
        }
        alpha = Math.round(255 * Math.min(1, (inside / total) * 1.6));
      }

      out[o] = r;
      out[o + 1] = g;
      out[o + 2] = b;
      out[o + 3] = alpha;
      kept += 1;
    }
  }

  // Occupancy over the whole sheet, so callers can reason in page coordinates
  // rather than in coordinates relative to this one ornament.
  const COLS = 16;
  const ROWS = 20;
  const cellCounts = new Int32Array(COLS * ROWS);
  const cellTotals = new Int32Array(COLS * ROWS);
  for (let y = 0; y < H; y += 2) {
    const row = Math.min(ROWS - 1, Math.floor((y / H) * ROWS));
    for (let x = 0; x < W; x += 2) {
      const col = Math.min(COLS - 1, Math.floor((x / W) * COLS));
      const cell = row * COLS + col;
      cellTotals[cell] += 1;
      if (keep.has(comp[idx(x, y)])) cellCounts[cell] += 1;
    }
  }
  const cells = Array.from(cellCounts, (n, i) =>
    cellTotals[i] ? +(n / cellTotals[i]).toFixed(3) : 0,
  );

  const raw = { raw: { width: ow, height: oh, channels: 4 as const } };
  const [webp, png] = await Promise.all([
    sharp(out, raw).webp({ quality: 84, alphaQuality: 92 }).toBuffer(),
    sharp(out, raw).png({ compressionLevel: 9 }).toBuffer(),
  ]);

  return {
    webp,
    png,
    box: { x: minX, y: minY, width: ow, height: oh },
    placement: {
      left: minX / W,
      top: minY / H,
      width: ow / W,
      height: oh / H,
    },
    coverage: { cols: COLS, rows: ROWS, cells },
    stats: { seeded, blobs: cid, keptBlobs: keep.size, pixels: kept },
  };
}

/** Named corners, for when the vision pass reports a corner instead of a box. */
export const CORNER_REGIONS: Record<string, OrnamentRegion> = {
  'top-left': { left: 0, top: 0, right: 0.55, bottom: 0.42 },
  'top-right': { left: 0.45, top: 0, right: 1, bottom: 0.42 },
  'bottom-left': { left: 0, top: 0.58, right: 0.55, bottom: 1 },
  'bottom-right': { left: 0.45, top: 0.58, right: 1, bottom: 1 },
  full: { left: 0, top: 0, right: 1, bottom: 1 },
};
