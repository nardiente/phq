export type PageType =
  | 'home'
  | 'settings'
  | 'account'
  | 'boost'
  | 'create-boost'
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
  | 'posts'
  | 'segments'
  | 'profiles'
  | 'prioritization'
  | 'free-trial-plans';

export const onbordingPaths = [
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
  '/reset-password',
  '/sign-in',
  '/sign-in/google',
  '/sign-up',
];
