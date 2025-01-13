import { Feedback, FeedbackTag } from '../../types/feedback';

export interface Roadmap {
  name: string;
  font_color: string;
  sort_order: number;
  background_color: string;
  id: number;
  upvotes?: Feedback[];
  roadmap_color_id: number;
}

export interface Status {
  name: string;
  font_color: string;
  sort_order: number;
}

export interface Tag {
  tag: string;
  id: number;
}

export interface Upvote {
  vote: number;
  title: string;
  id: number;
  feedback_tags?: FeedbackTag[];
  comment_count: number;
  onClick?: (params: any) => any;
}

export interface RoadmapColor {
  font_color: string;
  background_color: string;
  id: number;
  name: string;
}
