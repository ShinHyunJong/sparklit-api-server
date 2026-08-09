/**
 * Backfill InvitationSponsor rows from the legacy secondarySponsor text columns.
 *
 * The legacy columns are NOT modified — this is additive. Re-running is safe:
 * an invitation that already has rows is skipped unless --force is passed,
 * in which case its rows are replaced inside a transaction.
 *
 *   node -r dotenv/config prisma/migrations/manual/migrate_secondary_sponsor_to_rows.cjs --dry
 *   node -r dotenv/config prisma/migrations/manual/migrate_secondary_sponsor_to_rows.cjs
 *
 * Flags:
 *   --dry     print what would happen, write nothing
 *   --force   replace rows for invitations that already have them
 *   --id=N    restrict to a single invitation id
 */
const { PrismaClient } = require('../../../generated/prisma');
const prisma = new PrismaClient();

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry');
const FORCE = argv.includes('--force');
const ONLY_ID = (() => {
  const a = argv.find((x) => x.startsWith('--id='));
  return a ? Number(a.slice(5)) : null;
})();

// Internal/test accounts — excluded from the backfill.
const INTERNAL_EMAILS = new Set([
  'minseong.lee.korea@gmail.com',
  'pleiades9638@gmail.com',
]);

// --- Label detection -------------------------------------------------------
// A line is a label when it names a known ritual role, ends with a colon, is a
// "To <verb> ..." phrase, or is an ALL CAPS heading followed by a name line.
const ROLE_WORDS =
  '(?:candles?|veils?|cords?|sand|coins?|ring\\s*bearers?|coin\\s*bearers?|bible\\s*bearers?|' +
  'flower\\s*(?:girls?|ladies)|little\\s*bride|paw-?squad|wedding\\s*banner|' +
  'candle\\s*lighters?|secondary\\s*sponsors?)';
const ROLE_RE = new RegExp(`^\\s*${ROLE_WORDS}\\b\\s*(?:sponsors?)?\\s*:?\\s*$`, 'i');
const COLON_RE = /^\s*[^:]{2,60}:\s*$/;
const PHRASE_RE = /^\s*to\s+[a-z].{2,80}$/i;

const isAllCaps = (l) => {
  const letters = l.replace(/[^A-Za-z]/g, '');
  return letters.length >= 3 && l === l.toUpperCase();
};
// Names usually carry a title or join two people; treat those as data, not labels.
const looksLikeName = (l) =>
  /(?:^|\s)(mr|mrs|ms|dr|atty|engr|arch|mdm)\b\.?/i.test(l) || /&|\band\b|–|-/.test(l);

function isLabel(line, next) {
  const t = line.trim();
  if (!t) return false;
  if (ROLE_RE.test(t)) return true;
  if (COLON_RE.test(t) && !looksLikeName(t)) return true;
  if (PHRASE_RE.test(t) && !looksLikeName(t)) return true;
  if (isAllCaps(t) && !looksLikeName(t) && t.length <= 60) {
    const nextIsName = next && next.trim() && !isAllCaps(next.trim());
    if (nextIsName) return true;
  }
  return false;
}

// Group one text column into { label, names[] }. Text with no detectable label
// becomes a single group with an empty label, preserving the original newlines.
function parseColumn(raw) {
  if (!raw || !raw.trim()) return [];
  const lines = raw.split(/\r?\n/);
  const groups = [];
  let cur = null;

  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (!t) continue;
    const next = lines.slice(i + 1).find((l) => l.trim());

    if (isLabel(lines[i], next)) {
      const clean = t.replace(/:\s*$/, '').trim();
      // Some invitations spell a role across two adjacent label lines, e.g.
      // "Candle" then "TO LIGHT OUR PATH". Treat consecutive label lines as
      // one label rather than starting an empty group.
      if (cur && !cur.names.length && cur.label && lines[i - 1]?.trim()) {
        cur.label = `${cur.label} ${clean}`;
        continue;
      }
      cur = { label: clean, names: [] };
      groups.push(cur);
    } else {
      if (!cur) {
        cur = { label: '', names: [] };
        groups.push(cur);
      }
      cur.names.push(t);
    }
  }
  return groups;
}

// Merge the two text columns into rows. When the section renders as 2 columns,
// a label present on both sides collapses into one row (left/right names).
function buildRows(invitation) {
  const left = parseColumn(invitation.secondarySponsor);
  const right = parseColumn(invitation.secondarySponsorRight);
  const twoCol = invitation.secondarySponsorColumns === 2 && right.length > 0;
  const rows = [];

  if (twoCol) {
    const rightByLabel = new Map();
    right.forEach((g) => {
      const k = g.label.toLowerCase();
      if (k && !rightByLabel.has(k)) rightByLabel.set(k, g);
    });
    const used = new Set();

    // Same label on both sides = one role, two people. Different labels =
    // pair them positionally so each side keeps its own heading.
    left.forEach((g, i) => {
      const k = g.label.toLowerCase();
      let partner = k ? rightByLabel.get(k) : null;
      if (partner) used.add(partner);
      else if (right[i] && !used.has(right[i])) {
        partner = right[i];
        used.add(partner);
      }
      rows.push({
        label: g.label,
        labelRight: partner ? partner.label : '',
        nameLeft: g.names.join('\n'),
        nameRight: partner ? partner.names.join('\n') : '',
      });
    });

    // Roles that only exist on the right side keep their own row.
    right.forEach((g) => {
      if (used.has(g)) return;
      rows.push({
        label: '',
        labelRight: g.label,
        nameLeft: '',
        nameRight: g.names.join('\n'),
      });
    });
  } else {
    left.forEach((g) => {
      rows.push({
        label: g.label,
        labelRight: '',
        nameLeft: g.names.join('\n'),
        nameRight: '',
      });
    });
    // 1-column invitations sometimes still hold hidden right-hand text.
    // Carry it over so nothing is silently lost.
    right.forEach((g) => {
      rows.push({
        label: '',
        labelRight: g.label,
        nameLeft: '',
        nameRight: g.names.join('\n'),
      });
    });
  }

  return rows
    .filter((r) => r.label || r.labelRight || r.nameLeft || r.nameRight)
    .map((r, i) => ({
      label: r.label.slice(0, 100),
      labelRight: r.labelRight.slice(0, 100),
      nameLeft: r.nameLeft,
      nameRight: r.nameRight,
      order: i,
    }));
}

(async () => {
  const where = { NOT: { secondarySponsor: null } };
  if (ONLY_ID) where.id = ONLY_ID;

  const invitations = await prisma.invitation.findMany({
    where,
    select: {
      id: true,
      uniqueId: true,
      date: true,
      billingStatus: true,
      secondarySponsor: true,
      secondarySponsorRight: true,
      secondarySponsorColumns: true,
      user: { select: { email: true } },
      _count: { select: { invitationSponsorList: true } },
    },
    orderBy: { id: 'asc' },
  });

  const targets = invitations
    .filter((r) => typeof r.secondarySponsor === 'string' && r.secondarySponsor.trim())
    .filter((r) => !INTERNAL_EMAILS.has(r.user?.email || ''));

  console.log(`mode: ${DRY ? 'DRY RUN (no writes)' : 'WRITE'}${FORCE ? ' +force' : ''}`);
  console.log(`candidates: ${targets.length}\n`);

  let inserted = 0;
  let skipped = 0;
  let rowTotal = 0;

  for (const inv of targets) {
    const rows = buildRows(inv);
    const existing = inv._count.invitationSponsorList;

    if (existing > 0 && !FORCE) {
      console.log(`#${inv.id} skip — already has ${existing} row(s)`);
      skipped++;
      continue;
    }
    if (!rows.length) {
      console.log(`#${inv.id} skip — nothing to convert`);
      skipped++;
      continue;
    }

    const labels = rows
      .map((r) =>
        r.labelRight && r.labelRight !== r.label
          ? `${r.label || '·'} | ${r.labelRight}`
          : r.label || '(빈 라벨)',
      )
      .join(' / ');
    console.log(`#${String(inv.id).padEnd(4)} ${rows.length} rows  ${labels}`);

    if (!DRY) {
      await prisma.$transaction([
        prisma.invitationSponsor.deleteMany({ where: { invitationId: inv.id } }),
        prisma.invitationSponsor.createMany({
          data: rows.map((r) => ({ ...r, invitationId: inv.id })),
        }),
      ]);
    }
    inserted++;
    rowTotal += rows.length;
  }

  console.log(
    `\n${DRY ? 'would insert' : 'inserted'}: ${inserted} invitations, ${rowTotal} rows` +
      ` | skipped: ${skipped}`,
  );

  if (!DRY) {
    const total = await prisma.invitationSponsor.count();
    console.log(`InvitationSponsor now holds ${total} rows.`);
  }

  await prisma.$disconnect();
})().catch(async (e) => {
  console.error('ERROR:', e.message);
  await prisma.$disconnect();
  process.exit(1);
});
