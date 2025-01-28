export interface FeedbackComment {
  author: {
    id: number;
    full_name: string;
    profile_photo?: string;
    is_admin: boolean;
  };
  draft: boolean;
  comment: string;
  created_at?: Date;
  created_by_name: string;
  id: number;
  feedback_id: number;
  parent_id: number;
  emoji_list: any[];
  my_emoji: string[];
  hidden: boolean;
  deleted?: boolean;
  has_reply: boolean;
  internal?: boolean;
  mentioned_users: { id: number; full_name: string }[];
  pinned?: boolean;
  updated_by?: number;
}
