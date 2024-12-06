export interface LoginFormProps {
  is_mobile?: boolean;
  type?: UserTypes;
}

export enum UserTypes {
  CUSTOMER = 'customer',
  USER = 'user',
}
