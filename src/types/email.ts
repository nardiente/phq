export type CustomDomain = {
  enabled: boolean;
  email?: string;
  from_name?: string;
};

export type CustomerEmail = {
  sender_settings?: string;
  weekly_update?: boolean;
  ideas?: {
    new_vote_on_idea?: boolean;
    admin_edited_idea?: boolean;
    idea_was_approved?: boolean;
    idea_was_rejected?: boolean;
    idea_status_change?: boolean;
    idea_created_on_behalf?: boolean;
  };
  comments?: {
    comment_on_idea?: boolean;
  };
};

export interface Email {
  email: string;
  frequency: Frequency;
  notificationSettings: NotificationSettings;
  custom_domain?: CustomDomain;
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

export type Frequency = {
  label: 'Daily' | 'Weekly' | 'Monthly';
  value: 'daily' | 'weekly' | 'monthly' | string;
};

export type NotificationSettings = {
  ideas: boolean;
  feedback: boolean;
  comments: boolean;
};
