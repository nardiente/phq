import moment, { Moment } from 'moment';
import { dateOptions } from './constants';

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', dateOptions);

export const getNearestMonday = (date: Moment, getPrevious = true) => {
  const day = date.weekday(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const diff = getPrevious
    ? day === 1
      ? -7
      : 2 - day
    : day === 2
      ? 0
      : 8 - day;

  const monday = moment(date);
  return monday.add(diff, 'days');
};

export const isValidDate = (dateString: string) => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};
