import { formatDate } from 'date-fns';

export const extensiveDateFormat = 'dd MMMM yyyy EEEE @hh:mm';

export const formatDateExtensive = (date: string) => {
  return formatDate(date, extensiveDateFormat);
};
