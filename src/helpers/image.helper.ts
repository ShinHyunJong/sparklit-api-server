import sharp from 'sharp';

/**
 * 원본 이미지를 OG(1200x630)로 cover-crop 변환
 */
export async function makeOgImage(inputBuffer: Buffer) {
  return sharp(inputBuffer)
    .resize(1200, 630, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
}
