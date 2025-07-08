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
    comment_was_approved?: boolean;
    comment_was_rejected?: boolean;
    new_comment_reply?: boolean;
    mentioned_in_comment?: boolean;
  };
  following?: {
    comment_on_followed_idea?: boolean;
    status_changed_on_followed_idea?: boolean;
    new_vote_on_followed_idea?: boolean;
  };
  users?: {
    new_user_signup_approved?: boolean;
    welcome_new_user?: boolean;
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
  text: 'Daily' | 'Weekly' | 'Monthly';
  id: 'daily' | 'weekly' | 'monthly' | string;
};

export type NotificationSettings = {
  ideas: boolean;
  feedback: boolean;
  comments: boolean;
};
