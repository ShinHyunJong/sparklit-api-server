const parseTimePart = (value: string, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const buildTimeDate = (time: string) => {
  const [hourPart = '0', minutePart = '0', secondPart = '0'] =
    time.split(':');
  const hour = parseTimePart(hourPart, 0);
  const minute = parseTimePart(minutePart, 0);
  const second = parseTimePart(secondPart, 0);
  return new Date(Date.UTC(1970, 0, 1, hour, minute, second));
};

const padTimePart = (value: number) => String(value).padStart(2, '0');

export const formatTimeValue = (value?: Date | null) => {
  if (!value) return null;
  const hour = padTimePart(value.getUTCHours());
  const minute = padTimePart(value.getUTCMinutes());
  const second = padTimePart(value.getUTCSeconds());
  return `${hour}:${minute}:${second}`;
};

export const normalizeTimeString = (time: string) => {
  const trimmed = time.trim();
  const match = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return trimmed;
  const hour = padTimePart(parseTimePart(match[1], 0));
  const minute = padTimePart(parseTimePart(match[2], 0));
  const second = padTimePart(parseTimePart(match[3], 0));
  return `${hour}:${minute}:${second}`;
};
