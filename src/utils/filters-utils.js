import dayjs from 'dayjs';

export const isFuturePoint = (point) => dayjs().isBefore(point.dateFrom, 'minute');
export const isPresentPoint = (point) => dayjs().isAfter(point.dateFrom, 'minute') && dayjs().isBefore(point.dateTo, 'minute');
export const isPastPoint = (point) => dayjs().isAfter(point.dateTo, 'minute');

