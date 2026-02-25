import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat, DurationThresholds } from '../constants/const';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
dayjs.extend(duration);

export function humanizePointDueDate(dueDate, dateFormat){
  return dayjs.utc(dueDate).format(dateFormat);
}

export function getDuration(startDate, endDate) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);

  const diffMs = end.diff(start);

  if (diffMs < 0) {
    return dayjs.duration(0).format(DateFormat.DURATION_MINUTES);
  }

  const durationObj = dayjs.duration(diffMs);
  const totalMinutes = durationObj.asMinutes();

  if (totalMinutes < DurationThresholds.MINUTES_IN_HOUR) {
    return durationObj.format(DateFormat.DURATION_MINUTES);
  }

  if (totalMinutes < DurationThresholds.MINUTES_IN_DAY) {
    return durationObj.format(DateFormat.DURATION_HOURS_MINUTES);
  }

  return durationObj.format(DateFormat.DURATION_DAYS_HOURS_MINUTES);
}
