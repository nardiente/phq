export const getKaslKey = (): string | null =>
  localStorage.getItem(
    import.meta.env.VITE_SYSTEM_TYPE === 'public'
      ? 'public-kasl-key'
      : 'kasl-key'
  );

export const setKaslKey = (key: string): void =>
  localStorage.setItem(
    import.meta.env.VITE_SYSTEM_TYPE === 'public'
      ? 'public-kasl-key'
      : 'kasl-key',
    key
  );

export const eraseKaslKey = (): void =>
  localStorage.removeItem(
    import.meta.env.VITE_SYSTEM_TYPE === 'public'
      ? 'public-kasl-key'
      : 'kasl-key'
  );

export const getSessionToken = (): string | null =>
  localStorage.getItem('session_token');

export const setSessionToken = (key: string): void =>
  localStorage.setItem('session_token', key);

export const setCustomerKaslKey = (key: string): void =>
  localStorage.setItem('customer-kasl-key', key);

export const getCustomerKaslKey = (): string | null =>
  localStorage.getItem('customer-kasl-key');

export const setModerateUserLogin = (key: string): void =>
  localStorage.setItem('moderate-user-login', key);

export const getModerateUserLogin = (): boolean =>
  localStorage.getItem('moderate-user-login')?.toString() === 'true';

export const getPartneroPartner = (): string | null =>
  localStorage.getItem('partnero_partner');
