export interface FeedbackItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  tag?: string;
}

export interface Tag {
  tag: string;
  id: number;
}
