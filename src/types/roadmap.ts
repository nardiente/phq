import { FeedbackTag } from './feedback';

import { Feedback } from './feedback';

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

export interface RoadmapItem {
  id: number;
  name: string;
  status: 'Under Review' | 'Planned' | 'Completed' | 'In Progress';
  estimatedDate?: string;
  reach: number;
  impact: string | number;
  confidence: string;
  effort: number;
  score: number;
}

export interface IdeaFormData {
  name: string;
  description: string;
  status: RoadmapItem['status'];
  estimatedDate: string;
  tags: string[];
}
