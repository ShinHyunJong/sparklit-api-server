const countryTimezoneMap: Record<string, string> = {
  PH: 'Asia/Manila',
  ID: 'Asia/Jakarta',
  SG: 'Asia/Singapore',
  TH: 'Asia/Bangkok',
  MY: 'Asia/Kuala_Lumpur',
  VN: 'Asia/Ho_Chi_Minh',
  KH: 'Asia/Phnom_Penh',
  LA: 'Asia/Vientiane',
  MM: 'Asia/Yangon',
  BN: 'Asia/Brunei',
  TL: 'Asia/Dili',
};

export const getTimezoneByCountry = (
  country: string | null | undefined,
): string => {
  if (!country) return 'UTC';
  const normalizedCountry = country.trim().toUpperCase();
  return countryTimezoneMap[normalizedCountry] ?? 'UTC';
};
