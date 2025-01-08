import { OnboardingPages } from './onboarding';

export interface ForgotPasswordFormProps {
  is_mobile?: boolean;
  type?: UserTypes;
}

export enum ImageType {
  PROFILE_PHOTOS = 'profile-photos',
  COMPANY_LOGO = 'company-logos',
  WHATS_NEW_IMAGES = 'whats-new-images',
}

export enum InvitationType {
  PRIVATE_USER = 'private_user',
  TEAM_MEMBER = 'team_member',
}

export interface User {
  id?: number;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  company_heic_blob_url?: string;
  company_logo?: string;
  company_name?: string;
  country?: string;
  country_code?: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: string;
  birthdate?: string;
  email?: string;
  job_title?: string;
  profile_heic_blob_url?: string;
  profile_photo?: string;
  state?: string;
  zip_code?: string;
  created_at?: string;
  updated_at?: string;
  is_beta?: boolean;
  onboarding_done?: boolean;
  onboarding_page?: OnboardingPages;
  role_id?: number;
  type?: string;
  role?: RolePermission;
  is_private_user?: boolean;
  website_url?: string;
  stop_remind_add_board?: boolean;
  remind_3_days?: boolean;
  remind_3_days_timestamp?: string;
  kasl_key?: string;
  role_name?: string;
}

interface RoleBody {
  name: string;
  tag: string;
}

interface RolePermission {
  id: number;
  body: RoleBody;
}

export enum UserTypes {
  CUSTOMER = 'customer',
  USER = 'user',
}
