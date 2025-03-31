export enum TeamActivityAction {
  ADDED = 'added',
  COMMENTED = 'commented',
  DELETED = 'deleted',
  DOWNVOTED = 'downvoted',
  MOVED = 'moved',
  REPLIED = 'replied',
  SHARED = 'shared',
  UPDATED = 'updated',
  UPVOTED = 'upvoted',
}

export enum TeamActivityType {
  COMMENT = 'comment',
  IDEA = 'idea',
  POST = 'post',
}

export interface TeamActivity {
  id?: number;
  action: TeamActivityAction;
  created_at: string;
  created_by: number;
  new_state?: string;
  old_state?: string;
  subject: number;
  subject_owner?: number;
  type: TeamActivityType;
}
