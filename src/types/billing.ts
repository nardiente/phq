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
  remaining_days?: number;
  trial_end?: number | string | null;
}

export interface UserSubscription {
  can_purchase_powerup?: boolean;
  is_trial?: boolean;
  price_id: string;
  prices: Price[];
  status: string;
  stripe_subs_id: string;
}

export interface Plan {
  monthly: {
    plans: Price[];
    powerups: Price[];
  };
  yearly: {
    plans: Price[];
    powerups: Price[];
  };
  subscription?: UserSubscription;
}

export interface Price {
  active: boolean;
  id: string;
  amount: number;
  planName: string;
  price: string;
  product: Product;
  recurring: {
    interval: string;
    interval_count: number;
  };
}

export interface Product {
  id: string;
  name: string;
}

export interface CheckoutSession {
  url: string;
}

export interface Feature {
  tag: string;
  name: string;
  starter: string;
  growth: string;
  scale: string;
}

export interface LifetimeDeal {
  deals: Price[];
  subscription: Subscription | null;
}
