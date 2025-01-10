import { ApiFieldError } from '../utils/api/types';
import { User } from './user';

export interface Feedback {
  author?: {
    full_name: string;
    profile_photo?: string;
  };
  id?: number;
  vote: number;
  title?: string;
  description?: string;
  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  status?: Status;
  status_id?: number;
  tags?: string[];
  feedback_tags?: FeedbackTag[];
  comment_count?: number;
  did_vote?: boolean;
  not_administer?: boolean;
  draft?: boolean;
  vote_on_behalf?: User;
  vote_on_behalf_id?: number;
  estimated_release_date?: string;
  pinned?: boolean;
  customer_id?: number;
}

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

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tag?: string;
}

export interface FeedbackTag {
  tag_id: number;
  feedback_id: number;
  tag?: Tag;
}

export interface Status {
  name: string;
  background_color: string;
  border_color: string;
  font_color: string;
  sort_order: number;
}

export interface Tag {
  id: number;
  tag: string;
  description?: string;
  created_by?: number;
  created_at?: Date;
  updated_at?: Date;
  field_errors?: ApiFieldError[];
  on_delete?: (e: any) => void;
}
