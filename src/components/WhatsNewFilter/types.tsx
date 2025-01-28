import { ChangeType } from '@pages/Changelog/types';

export interface WhatsNewFilterProps {
  listChangeType: (change_types: string[]) => void;
  change_types: ChangeType[];
  listWhatsNew: (filters: number[]) => void;
}
