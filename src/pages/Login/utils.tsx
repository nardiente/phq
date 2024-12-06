import { emailPattern, urlPattern } from './constants';
import { isGoodPassword } from '@g-six/swiss-knife-lite';

export const validateEmail = (email: string) => {
  if ((email.length > 256 || !emailPattern.test(email)) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

export const validatePassword = (p: string) => {
  const { has_lower, has_number, has_special, has_upper, is_long_enough } =
    isGoodPassword(p, 8);

  if (
    p.length > 0 &&
    (!has_lower ||
      !has_number ||
      !has_special ||
      !has_upper ||
      !is_long_enough ||
      p.length < 8 ||
      p.length > 256)
  ) {
    return false;
  } else {
    return true;
  }
};

export const validateSubdomain = (subdomain: string) => {
  if (!urlPattern.test(subdomain + '.producthq.io') && subdomain.length > 0) {
    return false;
  } else {
    return true;
  }
};
