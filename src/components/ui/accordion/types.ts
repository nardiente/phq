export interface AccordionProps {
  title: string;
  content: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
} 