export interface Moderation {
  id: number;
  user_login: boolean;
  user_feedback: boolean;
  moderate_settings: ModerateSettings;
  user_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface ModerateSettings {
  feedback: boolean;
  votes: boolean;
  comments: boolean;
}
