import { Emails, Frequency } from '../types/email';

export const defaultEmails: Emails = {
  admin: {
    email: '',
    frequency: { id: 'weekly', text: 'Weekly' },
    notificationSettings: { comments: true, feedback: true, ideas: true },
  },
};

export const emailCategories = [
  {
    id: 'ideas',
    title: 'Ideas',
    items: [
      { id: 'new_vote_on_idea', text: 'New vote on my Idea' },
      { id: 'admin_edited_idea', text: 'Admin edited my Idea' },
      { id: 'idea_was_approved', text: 'My Idea was approved' },
      { id: 'idea_was_rejected', text: 'My Idea was rejected' },
      { id: 'idea_status_change', text: 'Idea status change' },
      { id: 'idea_created_on_behalf', text: 'Idea created on my behalf' },
    ],
  },
  {
    id: 'comments',
    title: 'Comments',
    items: [
      { id: 'comment_on_idea', text: 'New comment on my Idea' },
      { id: 'comment_was_approved', text: 'My comment was approved' },
      { id: 'comment_was_rejected', text: 'My comment was rejected' },
      { id: 'new_comment_reply', text: 'New comment reply' },
      { id: 'mentioned_in_comment', text: 'Mentioned in comment' },
    ],
  },
  {
    id: 'following',
    title: 'Following',
    items: [
      {
        id: 'comment_on_followed_idea',
        text: "New comment on Idea I'm following",
      },
      {
        id: 'status_changed_on_followed_idea',
        text: "Status changed on Idea I'm following",
      },
      {
        id: 'new_vote_on_followed_idea',
        text: "New vote on Idea I'm following",
      },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    items: [
      { id: 'new_user_signup_approved', text: 'New user signup approved' },
      { id: 'welcome_new_user', text: 'Welcome new user' },
    ],
  },
];

export const frequencies: Frequency[] = [
  { id: 'daily', text: 'Daily' },
  { id: 'weekly', text: 'Weekly' },
  { id: 'monthly', text: 'Monthly' },
];
