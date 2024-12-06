// export const emailPattern = /^([a-zA-Z0-9_.-]+)@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const emailPattern = /^\w+([\\.+-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const login_image_mobile =
  'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/login_image_mobile.svg';
export const login_image_web =
  'https://s3.amazonaws.com/uat-app.productfeedback.co/assets/login_image_web.svg';

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
