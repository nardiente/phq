import { Emails, Frequency } from '../types/email';

export const defaultEmails: Emails = {
  admin: {
    email: '',
    frequency: { label: 'Weekly', value: 'weekly' },
    notificationSettings: { comments: true, feedback: true, ideas: true },
  },
};

export const emailCategories = [
  {
    id: 'ideas',
    title: 'Ideas',
    items: [
      { id: 'new_vote_on_idea', label: 'New vote on my Idea' },
      { id: 'admin_edited_idea', label: 'Admin edited my Idea' },
      { id: 'idea_was_approved', label: 'My Idea was approved' },
      { id: 'idea_was_rejected', label: 'My Idea was rejected' },
      { id: 'idea_status_change', label: 'Idea status change' },
      { id: 'idea_created_on_behalf', label: 'Idea created on my behalf' },
    ],
  },
  {
    id: 'comments',
    title: 'Comments',
    items: [
      { id: 'comment_on_idea', label: 'New comment on my Idea' },
      { id: 'comment_was_approved', label: 'My comment was approved' },
      { id: 'comment_was_rejected', label: 'My comment was rejected' },
      { id: 'new_comment_reply', label: 'New comment reply' },
      { id: 'mentioned_in_comment', label: 'Mentioned in comment' },
    ],
  },
  {
    id: 'following',
    title: 'Following',
    items: [
      {
        id: 'comment_on_followed_idea',
        label: "New comment on Idea I'm following",
      },
      {
        id: 'status_changed_on_followed_idea',
        label: "Status changed on Idea I'm following",
      },
      {
        id: 'new_vote_on_followed_idea',
        label: "New vote on Idea I'm following",
      },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    items: [
      { id: 'new_user_signup_approved', label: 'New user signup approved' },
      { id: 'welcome_new_user', label: 'Welcome new user' },
    ],
  },
];

export const frequencies: Frequency[] = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
];
