import { BadRequestException } from '@nestjs/common';

const ALLOWED_IMAGE_MIMES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
]);

const ALLOWED_AUDIO_MIME_PREFIXES = ['audio/'];

export function assertImageMime(mimeType: string | undefined | null): void {
  if (!mimeType) {
    throw new BadRequestException('Missing file type');
  }
  const normalized = mimeType.toLowerCase();
  if (!ALLOWED_IMAGE_MIMES.has(normalized)) {
    throw new BadRequestException(
      `Unsupported image type: ${mimeType}. Allowed: jpeg, png, webp, heic, heif.`,
    );
  }
}

export function assertAudioMime(mimeType: string | undefined | null): void {
  if (!mimeType) {
    throw new BadRequestException('Missing file type');
  }
  const normalized = mimeType.toLowerCase();
  const isAudio = ALLOWED_AUDIO_MIME_PREFIXES.some((prefix) =>
    normalized.startsWith(prefix),
  );
  if (!isAudio) {
    throw new BadRequestException(
      `Unsupported audio type: ${mimeType}. Only audio files are allowed.`,
    );
  }
}
