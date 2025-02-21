export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft' | 'link' | 'white';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
} 