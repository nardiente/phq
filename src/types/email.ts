export type CustomerEmail = {
  sender_settings?: string;
  weekly_update?: boolean;
  new_vote_on_idea?: boolean;
  admin_edited_idea?: boolean;
  idea_was_approved?: boolean;
  idea_was_rejected?: boolean;
  idea_status_change?: boolean;
  idea_created_on_behalf?: boolean;
  comment_on_idea?: boolean;
};

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
  customer?: CustomerEmail;
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
