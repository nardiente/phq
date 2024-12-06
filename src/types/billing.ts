export enum CheckoutMode {
  ONE_TIME = 'one_time',
  RECURRING = 'recurring',
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
