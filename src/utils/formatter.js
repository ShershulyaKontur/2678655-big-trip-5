import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from '../constants/const';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(duration);

export const humanizePointDueDate = (dueDate, dateFormat) => {
  return dueDate ? dayjs.utc(dueDate).format(dateFormat) : '';
}

export function getDuration(startDate, endDate) {
  const diffMs = dayjs(endDate).diff(startDate);
  return dayjs.duration(diffMs).format(DateFormat.DURATION_FORMAT);
}
