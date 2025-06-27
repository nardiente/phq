import {
  BarChart,
  CreditCard,
  FileText,
  Heart,
  LayoutDashboard,
  LayoutTemplate,
  ListOrdered,
  Lock,
  Mail,
  Map,
  MessageSquare,
  Paintbrush,
  Palette,
  PieChart,
  Settings,
  Settings2,
  Tag,
  ThumbsUp,
  Upload,
  User,
  Users,
  Users2,
  Zap,
} from 'lucide-react';
import { MenuItem } from '../components/layout/SidebarMenu';
import DashboardPage from '../pages/DashboardPage';
import UpvotesPage from '../pages/Upvotes/UpvotesPage';
import { RoadmapPage } from '../pages/Roadmap/RoadmapPage';
import { WhatsNewPage } from '../pages/WhatsNew';
import WidgetsPage from '../pages/WidgetsPage';
import PrioritizationPage from '../pages/PrioritizationPage';
import SegmentsPage from '../pages/SegmentsPage';
import UserProfilesPage from '../pages/UserProfilesPage';
import { AccountSettings } from '../pages/Settings/AccountSettings';
import ProjectDetailsPage from '../pages/Settings/ProjectDetailsPage';
import AppearancePage from '../pages/Settings/AppearancePage';
import ModerationPage from '../pages/Settings/ModerationPage';
import TeamMembersPage from '../pages/Settings/TeamMembersPage';
import BillingPage from '../pages/Settings/BillingPage';
import TagsPage from '../pages/Settings/TagsPage';
import EmailsPage from '../pages/Emails/EmailsPage';
import ImportIdeasPage from '../pages/ImportIdeasPage';
import DesignSystem from '../pages/DesignSystem';
import SuperDuperAdminPage from '../pages/SuperDuperAdminPage';
import { RolePermissionsPage } from '../pages/RolePermissionsPage';

export const mainMenuItems: MenuItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    id: 'dashboard',
    component: DashboardPage,
  },
  { icon: ThumbsUp, label: 'Upvotes', id: 'upvotes', component: UpvotesPage },
  { icon: Map, label: 'Roadmap', id: 'roadmap', component: RoadmapPage },
  { icon: Zap, label: "What's New", id: 'whatsnew', component: WhatsNewPage },
  {
    icon: LayoutTemplate,
    label: 'Widgets',
    id: 'widgets',
    component: WidgetsPage,
  },
  {
    icon: ListOrdered,
    label: 'Prioritization',
    id: 'prioritization',
    component: PrioritizationPage,
  },
  {
    icon: PieChart,
    label: 'Segments',
    id: 'segments',
    hidden: false,
    component: SegmentsPage,
  },
  {
    icon: Users,
    label: 'Customer Profiles',
    id: 'profiles',
    hidden: true,
    component: UserProfilesPage,
  },
];

export const settingsMenuItems: MenuItem[] = [
  {
    icon: User,
    label: 'Account Details',
    id: 'account',
    component: AccountSettings,
  },
  {
    icon: Settings2,
    label: 'Project Details',
    id: 'project',
    component: ProjectDetailsPage,
  },
  {
    icon: Paintbrush,
    label: 'Appearance',
    id: 'appearance',
    component: AppearancePage,
  },
  {
    icon: MessageSquare,
    label: 'Moderation',
    id: 'moderation',
    component: ModerationPage,
  },
  {
    icon: Users2,
    label: 'Team Members',
    id: 'team',
    component: TeamMembersPage,
  },
  {
    icon: CreditCard,
    label: 'Billing and Invoicing',
    id: 'billing',
    component: BillingPage,
  },
  { icon: Tag, label: 'Tags', id: 'tags', component: TagsPage },
  { icon: Mail, label: 'Emails', id: 'emails', component: EmailsPage },
  {
    icon: Upload,
    label: 'Import Ideas',
    id: 'import',
    component: ImportIdeasPage,
  },
];

export const bottomMenuItems: MenuItem[] = [
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    component: AccountSettings,
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: FileText,
    link: 'https://support.producthq.io/',
  },
  {
    id: 'testimonials',
    label: 'Share your feedback',
    icon: Heart,
  },
  {
    icon: ThumbsUp,
    label: 'Submit Feature Request',
    id: 'submit-feature',
    link: 'https://feedback.producthq.io/upvotes',
  },
  {
    icon: Map,
    label: 'Our Roadmap',
    id: 'our-roadmap',
    link: 'https://feedback.producthq.io/roadmap',
  },
];

export const designSystemItem: MenuItem = {
  id: 'design',
  label: 'Design System',
  icon: Palette,
  position: 'bottom',
  divider: true,
  component: DesignSystem,
};

export const superDuperAdminItems: MenuItem[] = [
  {
    icon: Users,
    label: 'Team Members',
    id: 'super-duper-admin',
    component: SuperDuperAdminPage,
  },
  {
    icon: Settings,
    label: 'Account Details',
    id: 'account',
    component: AccountSettings,
  },
  { icon: BarChart, label: 'Audit Trail', id: 'audit-trail' },
  {
    icon: Lock,
    label: 'Role Permissions',
    id: 'role-permissions',
    component: RolePermissionsPage,
  },
];

export const publicViewMenuItems: MenuItem[] = [
  { icon: ThumbsUp, label: 'Upvotes', id: 'upvotes', component: UpvotesPage },
  { icon: Map, label: 'Roadmap', id: 'roadmap', component: RoadmapPage },
  { icon: Zap, label: "What's New", id: 'whatsnew', component: WhatsNewPage },
];
