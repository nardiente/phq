import { Tag } from './feedback';

export interface Notification {
  id: number;
  is_read?: boolean;
  feedback_id?: number;
  feedback_comment_id?: number;
  message?: string;
  notifier: {
    id: number;
    full_name: string;
  };
  created_at: string;
  updated_at: string;
}

export interface NotificationRequest {
  feedback_id?: number;
  feedback_comment_id?: number;
  message?: string;
  notified_user_id: number;
}

export interface UserNotification {
  has_unread: boolean;
  notifications: Notification[];
}

export interface RoadmapFilterProps {
  active_tags: string[];
  handleGetStatus: (tags: string[]) => void;
  tags: Tag[];
}
