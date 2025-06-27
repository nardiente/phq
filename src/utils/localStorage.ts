import { User } from '../types/user';

export const getKaslKey = (): string | undefined =>
  localStorage.getItem(
    import.meta.env.VITE_SYSTEM_TYPE === 'public'
      ? 'public-kasl-key'
      : 'kasl-key'
  ) ?? undefined;

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

export const getSessionToken = (): string | undefined =>
  localStorage.getItem('session_token') ?? undefined;

export const setSessionToken = (key: string): void =>
  localStorage.setItem('session_token', key);

export const eraseSessionToken = (): void =>
  localStorage.removeItem('session_token');

export const setCustomerKaslKey = (key: string): void =>
  localStorage.setItem('customer-kasl-key', key);

export const getCustomerKaslKey = (): string | undefined =>
  localStorage.getItem('customer-kasl-key') ?? undefined;

export const setModerateUserLogin = (key: string): void =>
  localStorage.setItem('moderate-user-login', key);

export const getModerateUserLogin = (): boolean =>
  localStorage.getItem('moderate-user-login')?.toString() === 'true';

export const getPartneroPartner = (): string | undefined =>
  localStorage.getItem('partnero_partner') ?? undefined;

export const setOnboardingToken = (key: string): void =>
  localStorage.setItem('onboarding_token', key);

export const getOnboardingToken = (): string | undefined =>
  localStorage.getItem('onboarding_token') ?? undefined;

export const eraseOnboardingToken = (): void =>
  localStorage.removeItem('onboarding_token');

export const setImpersonator = (user?: User): void => {
  if (!user) return;
  localStorage.setItem('impersonator', JSON.stringify(user, null, 2));
};

export const getImpersonator = (): User | undefined => {
  const impersonator = localStorage.getItem('impersonator');
  if (!impersonator) return;
  return JSON.parse(impersonator);
};

export const eraseImpersonator = (): void =>
  localStorage.removeItem('impersonator');
