import { ApiFieldError } from '../utils/api/types';
import { User } from './user';

export interface Feedback {
  author?: {
    full_name: string;
    profile_photo?: string;
  };
  id: number;
  vote: number;
  title: string;
  description?: string;
  created_by?: number;
  created_at?: Date;
  updated_by?: number;
  updated_at?: Date;
  status?: Status;
  status_id?: number;
  tags?: string[] | string;
  feedback_tags?: FeedbackTag[];
  comment_count?: number;
  did_vote?: boolean;
  not_administer?: boolean;
  draft?: boolean;
  vote_on_behalf?: User;
  vote_on_behalf_id?: number;
  estimated_release_date?: string;
  pinned?: boolean;
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
