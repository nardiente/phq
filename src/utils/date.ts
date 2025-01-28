import { dateOptions } from './constants';

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', dateOptions);
