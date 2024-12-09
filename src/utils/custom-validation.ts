import { isGoodPassword } from '@g-six/swiss-knife-lite';
import { emailPattern, urlPattern } from './constants';

export const validateCompanyName = (company_name: string) => {
  return (
    company_name.length === 0 ||
    (company_name.length >= 2 && company_name.length <= 100)
  );
};

export const validateEmail = (email: string) => {
  if ((email.length > 256 || !emailPattern.test(email)) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

export const validateFullName = (fullName: string) => {
  if (fullName.length == 0) {
    return 'This is a required field.';
  }
  if (fullName.length < 2 || fullName.length > 100) {
    return 'Please enter a name between 2 and 100 characters.';
  }
  return null;
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
