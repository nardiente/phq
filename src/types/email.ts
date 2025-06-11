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
}

export interface Emails {
  admin: Email;
  customer: Email;
}

export const frequencies = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];
