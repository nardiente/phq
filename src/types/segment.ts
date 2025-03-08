export interface Attribute {
  key: AttributeKeys;
  label: Attributes;
}

export type AttributeKeys =
  | 'id'
  | 'first_name+last_name'
  | 'full_name'
  | 'email'
  | 'phone'
  | 'registered_at'
  | 'users_subscriptions.user_id'
  | 'subscription'
  | 'last_seen'
  | 'status'
  | 'lifetime_value'
  | 'job_title'
  | 'logged_in_at'
  | 'feedback.created_by|anonymous_id'
  | 'idea_count'
  | 'feedback_comment.created_by|anonymous_id'
  | 'comment_count'
  | 'upvote_log.user_id|anonymous_id'
  | 'vote_count'
  | 'company_name'
  | 'projects.company_created_at'
  | 'company_created_at'
  | 'monthly_spend'
  | 'new_users'
  | 'is_activated'
  | 'high_value_customers'
  | 'churn_risk';

export enum Attributes {
  USER_ID = 'User Id',
  FULL_NAME = 'Full Name',
  EMAIL = 'Email',
  PHONE = 'Phone',
  SIGNED_UP = 'Signed Up',
  SUBSCRIPTION = 'Subscription',
  LAST_SEEN = 'Last Seen',
  STATUS = 'Status',
  LIFETIME_VALUE = 'Lifetime Value',
  JOB_TITLE = 'Job Title',
  LAST_LOGIN = 'Last Login',
  IDEA_COUNT = 'Idea Count',
  COMMENT_COUNT = 'Comment Count',
  VOTE_COUNT = 'Vote Count',
  COMPANY_NAME = 'Company Name',
  COMPANY_CREATED_AT = 'Company Created At',
  MONTHLY_SPEND = 'Monthly Spend',
  NEW_USERS = 'New Users',
  ACTIVE_USERS = 'Active Users',
  HIGH_VALUE_CUSTOMERS = 'High-value Customers',
  CHURN_RISK = 'Churn Risk',
}

export const CustomerAttributes: Attribute[] = [
  { key: 'id', label: Attributes.USER_ID },
  { key: 'full_name', label: Attributes.FULL_NAME },
  { key: 'email', label: Attributes.EMAIL },
  { key: 'phone', label: Attributes.PHONE },
  { key: 'registered_at', label: Attributes.SIGNED_UP },
  { key: 'subscription', label: Attributes.SUBSCRIPTION },
  { key: 'last_seen', label: Attributes.LAST_SEEN },
  { key: 'status', label: Attributes.STATUS },
  { key: 'lifetime_value', label: Attributes.LIFETIME_VALUE },
  { key: 'job_title', label: Attributes.JOB_TITLE },
  { key: 'logged_in_at', label: Attributes.LAST_LOGIN },
  { key: 'idea_count', label: Attributes.IDEA_COUNT },
  {
    key: 'comment_count',
    label: Attributes.COMMENT_COUNT,
  },
  { key: 'vote_count', label: Attributes.VOTE_COUNT },
  { key: 'company_name', label: Attributes.COMPANY_NAME },
  { key: 'company_created_at', label: Attributes.COMPANY_CREATED_AT },
  { key: 'monthly_spend', label: Attributes.MONTHLY_SPEND },
  { key: 'new_users', label: Attributes.NEW_USERS },
  { key: 'is_activated', label: Attributes.ACTIVE_USERS },
  { key: 'high_value_customers', label: Attributes.HIGH_VALUE_CUSTOMERS },
  { key: 'churn_risk', label: Attributes.CHURN_RISK },
];

export interface Segment {
  id: number;
  created_by: number;
  name: string;
  filters: { [key in Attributes]?: { operator: string; filterValue: string } };
  selectedAttributes: { [key in Attributes]?: boolean };
  updated_by?: number;
}
