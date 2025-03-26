import { ChangeType } from '../../types/whats-new';

export interface WhatsNewFilterProps {
  listChangeType: (change_types: string[]) => void;
  change_types: ChangeType[];
  listWhatsNew: (filters: number[]) => void;
}
