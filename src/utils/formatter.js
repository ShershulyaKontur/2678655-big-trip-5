import dayjs from 'dayjs';
import { DATE_FORMAT } from '../const/const';

export function formatDate(date){
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

export function getDuration(startDate, endDate){
  const diffMinutes = dayjs(endDate).diff(startDate, 'minute');
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  return `${hours ? `${hours}H ` : ''}${minutes}M`;
}
