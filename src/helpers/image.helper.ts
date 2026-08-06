import sharp from 'sharp';

/** 원본 보관 시 허용하는 최대 변 길이(px) */
export const MAX_ORIGINAL_SIZE = 1024;

/**
 * 업로드된 원본을 최대 1024px로 축소하고 압축한다.
 * - 긴 변 기준으로 맞추며 비율은 유지한다
 * - 1024px보다 작은 이미지는 확대하지 않는다
 * - EXIF 회전을 실제 픽셀에 반영한다 (반영하지 않으면 세로 사진이 눕고
 *   width/height가 뒤바뀐다)
 *
 * next/image에 width/height를 그대로 넘겨 비율을 잡으므로, 호출부는 반드시
 * 여기서 반환한 width/height(=압축 후 크기)를 저장해야 한다.
 */
export async function compressOriginal(inputBuffer: Buffer) {
  const { data, info } = await sharp(inputBuffer)
    .rotate()
    .resize(MAX_ORIGINAL_SIZE, MAX_ORIGINAL_SIZE, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer({ resolveWithObject: true });

  return { buffer: data, width: info.width, height: info.height };
}

/**
 * 원본 이미지를 OG(1200x630)로 cover-crop 변환
 */
export async function makeOgImage(inputBuffer: Buffer) {
  return sharp(inputBuffer)
    .resize(1200, 630, {
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true,
    })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}
