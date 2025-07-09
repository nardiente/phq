import { OnboardingPages } from './onboarding';

export interface ForgotPasswordFormProps {
  is_mobile?: boolean;
  type?: UserTypes;
}

export enum ImageType {
  '' = '',
  COMPANY_LOGO = 'company-logos',
  FAVICON = 'favicon',
  IDEA_COVER = 'idea-covers',
  PROFILE_PHOTOS = 'profile-photos',
  WHATS_NEW_IMAGES = 'whats-new-images',
}

export enum InvitationType {
  PRIVATE_USER = 'private_user',
  TEAM_MEMBER = 'team_member',
}

export enum LoginType {
  ADMIN = 'ADMIN',
  PUBLIC = 'PUBLIC',
}

export interface RbacPermission {
  id: number;
  is_hidden?: boolean;
  name: string;
  rbac_group_id: number;
  tag: string;
}

export interface RolesPermission {
  id: number;
  has_permission: boolean;
  rbac_permission_id: number;
  role_id: number;
}

export interface Role {
  id: number;
  name: string;
  sort: number;
  tag: string;
}

export interface Session {
  id?: number;
  user_id?: number;
  anonymous_id?: number;
  token?: string;
  user_agent: string;
  ip_address: string;
  timestamp: string;
  login_type?: LoginType;
  created_at?: string;
  updated_at?: string;
}

export interface Team {
  anonymousSessions: Session[];
  members: User[];
  owner?: User;
  publicUsers: User[];
}

export interface TeamMember {
  updatedTeamMembers: User[];
  team: Team;
}

export interface User {
  id?: number;
  customer_id?: number;
  team_owner_id?: number;
  added_vote_on_behalf?: boolean;
  address_line1?: string;
  address_line2?: string;
  alternate_email?: string;
  birthdate?: string;
  city?: string;
  company_heic_blob_url?: string;
  company_logo?: string;
  company_name?: string;
  country?: string;
  country_code?: string;
  deleted?: boolean;
  email?: string;
  email_confirmation_sent?: boolean;
  favicon?: string;
  first_name?: string;
  full_name?: string;
  gender?: string;
  isAnonymous?: boolean;
  is_activated?: boolean;
  is_beta?: boolean;
  is_private_user?: boolean;
  is_receiving_newsletter?: boolean;
  job_title?: string;
  kasl_key?: string;
  last_name?: string;
  logged_in_at?: string;
  login_type?: LoginType;
  onboarding_done?: boolean;
  onboarding_page?: OnboardingPages;
  partnero_partner?: string;
  password_hash?: string;
  permissions?: string[];
  phone?: string;
  profile_heic_blob_url?: string;
  profile_photo?: string;
  rbac_permissions?: string[];
  registered_at?: string;
  reinvited?: boolean;
  remind_3_days?: boolean;
  remind_3_days_timestamp?: string;
  reset_key?: string;
  reset_requested_at?: string;
  role?: Role;
  role_id?: number;
  role_name?: string;
  state?: string;
  stop_remind_add_board?: boolean;
  stripe_cust_id?: string;
  token?: string;
  type?: string;
  value?: string;
  website_url?: string;
  zip_code?: string;
  created_at?: string;
  updated_at?: string;
}

export enum UserTypes {
  CUSTOMER = 'customer',
  USER = 'user',
}
