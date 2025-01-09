export interface PageHeaderProps {
  buttonLabel?: string;
  header: string;
  listWhatsNew?: (filters: number[]) => void;
  pageContainerClass?: string;
  openPostForm?: (post: any) => void;
  secondaryButtonLabel?: string;
  showButtonIcon?: boolean;
  handleOnCancel?: () => void;
  handleOnUpdate?: () => void;
  loading?: boolean;
  disabled?: boolean;
}
