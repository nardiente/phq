import Cookies from 'js-cookie';

export const getCookie = (key: string): string | undefined => {
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    while (cookie.charAt(0) == ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(`${key}=`) === 0) {
      return cookie.substring(`${key}=`.length, cookie.length);
    }
  }

  return;
};

export const getKaslKey = (): string | undefined =>
  import.meta.env.SYSTEM_TYPE === 'public'
    ? getCookie('public-kasl-key')
    : getCookie('kasl-key');

export const setCookie = (
  key: string,
  value: string | boolean,
  days?: number
): void => {
  Cookies.withConverter<string | boolean>({}).set(key, value, {
    expires: days,
  });
};

export const setKaslKey = (key: string): void =>
  import.meta.env.SYSTEM_TYPE === 'public'
    ? setCookie('public-kasl-key', key)
    : setCookie('kasl-key', key);

export const eraseCookie = (key: string): void => Cookies.remove(key);

export const eraseKaslKey = (): void =>
  import.meta.env.SYSTEM_TYPE === 'public'
    ? eraseCookie('public-kasl-key')
    : eraseCookie('kasl-key');

export const getSessionToken = (): string | undefined =>
  getCookie('session_token');

export const setSessionToken = (key: string): void =>
  setCookie('session_token', key);

export const setCustomerKaslKey = (key: string): void =>
  setCookie('customer-kasl-key', key);

export const getCustomerKaslKey = (): string | undefined =>
  getCookie('customer-kasl-key');

export const setModerateUserLogin = (key: boolean): void =>
  setCookie('moderate-user-login', key);

export const getModerateUserLogin = (): boolean =>
  getCookie('moderate-user-login')?.toString() === 'true';
