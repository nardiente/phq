import { Role, User } from './user';

export interface AccessHistory {
  id?: number;
  accessed_by_id: number;
  accessed_by?: User;
  customer_id: number;
  customer?: User;
  role_id: number;
  role: Partial<Role>;
  timestamp?: string;
  created_at?: string;
  updated_at?: string;
}
