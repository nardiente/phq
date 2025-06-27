import moment, { Moment } from 'moment';
import { dateOptions } from './constants';

export const convertDate = (date: string) => {
  const currentDate = moment(date);
  const diffInMinutes = moment().diff(currentDate, 'minutes');
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  const diffInHours = moment().diff(currentDate, 'hours');
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  const diffInDays = moment().diff(currentDate, 'days');
  if (diffInDays < 3) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  return currentDate.format('MMM D, YYYY');
};

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
