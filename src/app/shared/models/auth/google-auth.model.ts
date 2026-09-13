export interface IGoogleAuth {
  iso3: string; // مثل 'irn'
  jwtGoogle: string | undefined;
  referralCode?: string;
  authorization?: string; // JSON.stringify(...) می‌شود string
}
