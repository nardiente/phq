export type PageType =
  | 'home'
  | 'settings'
  | 'account'
  | 'project'
  | 'appearance'
  | 'moderation'
  | 'emails'
  | 'tags'
  | 'team'
  | 'billing'
  | 'import'
  | 'dashboard'
  | 'activity'
  | 'mentions'
  | 'matrix'
  | 'widgets'
  | 'surveys'
  | 'testimonials'
  | 'sign-in'
  | 'upvotes'
  | 'roadmap'
  | 'docs'
  | 'submit-feature'
  | 'our-roadmap'
  | 'pricing'
  | 'whatsnew'
  | 'segments'
  | 'profiles'
  | 'prioritization'
  | 'free-trial-plans'
  | 'lifetime-deal'
  | 'super-duper-admin'
  | 'role-permissions';

export const onbordingPaths = [
  '/free-trial-plans',
  '/lifetime-deal',
  '/ob-board',
  '/ob-idea',
  '/ob-tags',
  '/ob-survey',
  '/ob-success',
  '/pricing',
];

export const pathExceptions = [
  '/forgot-password',
  '/free-trial-plans',
  '/lifetime-deal',
  '/pricing',
  '/reset-password',
  '/sign-in',
  '/sign-in/google',
  '/sign-up',
  '/test',
];
