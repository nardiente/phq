import { dateOptions } from './constants';

export const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', dateOptions);
