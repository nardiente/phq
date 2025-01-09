export interface Card {
  id: number;
  icon: string;
  type: string;
  number: string;
  cvv_cvc: string;
  expiration: string;
  cardholder_name: string;
  primary?: boolean;
}

export enum CheckoutMode {
  ONE_TIME = 'one_time',
  RECURRING = 'recurring',
}

export interface Country {
  code: string;
  country: string;
  id: number;
}

export interface InvoiceHistory {
  billed_on: Date;
  status: string;
  description: string;
  total: number;
  invoice_pdf: string;
}

export interface Subscription {
  id: number;
  name?: string;
  currency: number;
  price: number;
  price_ids?: string[];
  current_period_start: Date;
  current_period_end: Date | string;
  items: {
    name: string;
  }[];
  status: string;
  cancel_at_period_end: boolean;
  mode?: CheckoutMode;
  is_trial?: boolean;
}
