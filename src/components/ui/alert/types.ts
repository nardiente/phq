import { ReactNode } from 'react';

export type AlertVariant = 
  | 'dark' | 'green' | 'purple' | 'blue' | 'red' | 'orange' | 'yellow' | 'light' | 'gray'
  | 'soft-dark' | 'soft-gray' | 'soft-green' | 'soft-purple' | 'soft-blue' | 'soft-red' | 'soft-orange' | 'soft-yellow'
  | 'rounded-dark' | 'rounded-gray' | 'rounded-green' | 'rounded-purple' | 'rounded-blue' | 'rounded-red' | 'rounded-orange' | 'rounded-yellow' | 'rounded-light';

export type AlertContent = string | ReactNode;

export interface AlertProps {
  variant: AlertVariant;
  title?: AlertContent;
  description?: AlertContent;
  actions?: ReactNode;
  icon?: ReactNode;
  link?: { text: string; onClick?: () => void };
  onDismiss?: () => void;
} 