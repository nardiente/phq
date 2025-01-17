// export const emailPattern = /^([a-zA-Z0-9_.-]+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const emailPattern = /^\w+([\\.+-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const login_image_mobile =
  '../../../static/assets/login_image_mobile.svg';
export const login_image_web = '../../../static/assets/login_image_web.svg';

export const min_web_width = 769;

export const mobile_image_height = 200;
export const mobile_image_width = 390;

export const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$',
  'i' // validate fragment locator
);

export const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
};

export enum Publications {
  DRAFT = 'Draft',
  PREVIEW = 'Preview',
  PUBLISHED = 'Published',
}

export const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'Online Patient Registration',
    status: 'Under Review',
    estimatedDate: 'Mar 20, 2023',
    reach: 24,
    impact: 3,
    confidence: '100% - High',
    effort: 3,
    score: 0,
  },
  {
    id: 2,
    name: 'Patient Portal',
    status: 'Planned',
    estimatedDate: 'Apr 15, 2023',
    reach: 15,
    impact: 3,
    confidence: '50% - Low',
    effort: 2,
    score: 0,
  },
] as const;
