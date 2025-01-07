export interface ProjectAppearance {
  id?: number;
  project_id: number;
  active_link_color: string;
  background_color: string;
  button_text_color: string;
  created_by: number;
  default_text_color: string;
  icon_color: string;
  primary_button_border: string;
  primary_button_color: string;
  sign_in_button_color: string;
  sign_in_button_border_color: string;
  sign_in_button_hover_color: string;
  sign_in_button_text_color: string;
  sign_in_button_text_hover_color: string;
  sign_up_button_color: string;
  sign_up_button_border_color: string;
  sign_up_button_hover_color: string;
  sign_up_button_text_color: string;
  sign_up_button_text_hover_color: string;
  tags_active_background_color: string;
  tags_active_text_color: string;
  tags_default_background_color: string;
  tags_default_text_color: string;
  check_box_active_color: string;
  user_name_display_format?: UserNameFormat;
  updated_by?: number;
}

export enum UserNameFormat {
  FF_FL = 'FULLFIRST_FULLLAST',
  FL_LF = 'FIRSTLAST_LASTFIRST',
  FN = 'FIRSTNAME',
  LN = 'LASTNAME',
  AF_FL = 'ABBRFIRST_FULLLAST',
  FF_AL = 'FULLFIRST_ABBRLAST',
}

export interface DisplayUserName {
  text: string;
  format: UserNameFormat;
}

export const userNameFormats = [
  UserNameFormat.FF_FL,
  UserNameFormat.FL_LF,
  UserNameFormat.FN,
  UserNameFormat.LN,
  UserNameFormat.AF_FL,
  UserNameFormat.FF_AL,
];
