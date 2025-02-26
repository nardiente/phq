import { ApiFieldError } from '../utils/api/types';
import { User } from './user';

export interface Feedback {
  id?: number;
  author?: {
    full_name: string;
    profile_photo?: string;
  };
  comment_count?: number;
  confidence?: Confidences;
  created_at?: Date;
  created_by?: number;
  customer_id?: number;
  description?: string;
  did_vote?: boolean;
  draft?: boolean;
  effort?: number;
  estimated_release_date?: string;
  feedback_tags?: FeedbackTag[];
  hide_on_roadmap?: boolean;
  impact?: Impacts;
  not_administer?: boolean;
  pinned?: boolean;
  reach?: number;
  score?: number;
  status?: Status;
  status_id?: number;
  tags?: string[];
  title?: string;
  updated_at?: Date;
  updated_by?: number;
  vote: number;
  vote_on_behalf?: User;
  vote_on_behalf_id?: number;
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
