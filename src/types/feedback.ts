import { ApiFieldError } from '../utils/api/types';
import { User } from './user';

export interface Feedback {
  id?: number;
  anonymous_id?: number;
  author?: User;
  comment_count?: number;
  confidence?: Confidences;
  cover_heic_blob_url?: string;
  cover_photo?: string;
  created_at?: Date;
  created_by?: number;
  ctr?: number;
  customer_id?: number;
  deleted?: boolean;
  description?: string;
  did_vote?: boolean;
  draft?: boolean;
  effort?: number;
  estimated_release_date?: string;
  feedback_tags?: FeedbackTag[];
  file_name?: string;
  hide_on_roadmap?: boolean;
  impact?: Impacts;
  index: number;
  is_archived?: boolean;
  not_administer?: boolean;
  pinned?: boolean;
  reach?: number;
  reactions?: number;
  score?: number;
  status?: Status;
  status_id?: number;
  tags?: string[];
  title?: string;
  updated_at?: Date;
  updated_by?: number;
  url?: string;
  views?: number;
  vote: number;
  vote_on_behalf?: User;
  vote_on_behalf_id?: number;
  admin_approval_status?: 'approved' | 'rejected' | 'pending';
  rejected_reason?: string;
}

export interface FeedbackUpload {
  id?: number;
  file_name: string;
  url: string;
}

export enum Confidences {
  LOW = 50,
  MEDIUM = 80,
  HIGH = 100,
}

export const Confidence = {
  [Confidences.LOW]: '50% - Low',
  [Confidences.MEDIUM]: '80% - Medium',
  [Confidences.HIGH]: '100% - High',
};

export const Efforts = [1, 3, 5, 8, 13];

export enum Impacts {
  MASSIVE = 3,
  HIGH = 2,
  MEDIUM = 1,
  LOW = 0.5,
  MINIMAL = 0.25,
}

export const Impact = {
  [Impacts.MASSIVE]: 'Massive',
  [Impacts.HIGH]: 'High',
  [Impacts.MEDIUM]: 'Medium',
  [Impacts.LOW]: 'Low',
  [Impacts.MINIMAL]: 'Minimal',
};

export interface FeedbackComment {
  anonymous_id?: number;
  author: {
    id: number;
    full_name: string;
    profile_photo?: string;
    is_admin: boolean;
  };
  attachments?: (
    | { file_name: string; url: string }
    | {
        file_name: string;
        content_type: string;
        content: string;
      }
  )[];
  draft: boolean;
  comment: string;
  created_at?: Date;
  created_by?: number;
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
  admin_approval_status?: 'approved' | 'rejected' | 'pending';
  rejected_reason?: string;
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

export interface UpvoteLog {
  id?: number;
  feedback_id: number;
  user_id?: number;
  anonymous_id?: number;
  admin_approval_status?: 'approved' | 'rejected' | 'pending';
  deleted?: boolean;
  on_behalf?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
