import { Feedback } from '../../types/feedback';

export interface Roadmap {
  name: string;
  font_color: string;
  sort_order: number;
  background_color: string;
  id: number;
}

export interface RoadmapPublicViewPageProps {
  active_feedback?: Feedback;
  onGetUpvote?: React.MouseEventHandler<HTMLSpanElement>;
  roadmaps: Roadmap[];
}

export interface Status {
  name: string;
  font_color: string;
  sort_order: number;
}
