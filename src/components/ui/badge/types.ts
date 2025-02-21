export type BadgeVariant = 'white' | 'outlined' | 'soft' | 'solid';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
} 