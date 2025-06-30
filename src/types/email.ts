export interface Email {
  email: string;
  frequency: {
    label: string | 'Daily' | 'Weekly' | 'Monthly';
    value: string | 'daily' | 'weekly' | 'monthly';
  };
  notificationSettings: {
    ideas: boolean;
    feedback: boolean;
    comments: boolean;
  };
  custom_domain?: {
    enabled: boolean;
    email?: string;
    from_name?: string;
  };
}

export interface Emails {
  id?: number;
  admin: Email;
  customer: Email;
  created_at?: string;
  created_by?: number;
  project_id?: number;
  updated_at?: string;
  updated_by?: number;
}

export const frequencies = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];
