export interface Moderation {
  id: number;
  allow_anonymous_access: boolean;
  moderate_settings: ModerateSettings;
  project_id: number;
  user_feedback: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ModerateSettings {
  comments: boolean;
  feedback: boolean;
  votes: boolean;
}
