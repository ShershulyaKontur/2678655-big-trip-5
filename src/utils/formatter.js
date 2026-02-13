import dayjs from 'dayjs';

export const humanizePointDueDate = (dueDate, dateFormat) => dueDate ? dayjs(dueDate).format(dateFormat) : '';

export function getDuration(startDate, endDate) {
  const diffMinutes = dayjs(endDate).diff(startDate, 'minute');
  const days = Math.floor(diffMinutes / (24 * 60));
  const restMinutesAfterDays = diffMinutes % (24 * 60);
  const hours = Math.floor(restMinutesAfterDays / 60);
  const minutes = restMinutesAfterDays % 60;

  const formatPart = (value) => String(value).padStart(2, '0');

  if (diffMinutes < 60) {
    return `${minutes}M`;
  }

  if (diffMinutes < 24 * 60) {
    return `${formatPart(hours)}H ${formatPart(minutes)}M`;
  }

  return `${formatPart(days)}D ${formatPart(hours)}H ${formatPart(minutes)}M`;
}
