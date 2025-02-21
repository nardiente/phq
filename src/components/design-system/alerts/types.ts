export type AlertVariant = 
  | 'dark' | 'green' | 'purple' | 'blue' | 'red' | 'orange' | 'yellow' | 'light' | 'gray'
  | 'soft-dark' | 'soft-gray' | 'soft-green' | 'soft-purple' | 'soft-blue' | 'soft-red' | 'soft-orange' | 'soft-yellow'
  | 'rounded-dark' | 'rounded-gray' | 'rounded-green' | 'rounded-purple' | 'rounded-blue' | 'rounded-red' | 'rounded-orange' | 'rounded-yellow' | 'rounded-light'
  | 'example-warning' | 'example-error' | 'example-info'
  | 'example-link-right' | 'example-discover' | 'example-dismiss'
  | 'example-upload-success' | 'example-update-available' | 'example-user-deleted' | 'example-avatar';

export type AlertContent = string | React.ReactNode;

export interface AlertProps {
  variant: AlertVariant;
  title?: AlertContent;
  description?: AlertContent;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
  link?: { text: string; onClick?: () => void };
  onDismiss?: () => void;
  avatar?: string;
} 