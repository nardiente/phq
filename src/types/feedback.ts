import { ApiFieldError } from '../utils/api/types';

export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tag?: string;
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
