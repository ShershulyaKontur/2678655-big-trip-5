import dayjs from 'dayjs';

export const isFutureEvent = (event) => dayjs().isBefore(event.dateFrom, 'minute');
export const isPresentEvent = (event) => dayjs().isAfter(event.dateFrom, 'minute') && dayjs().isBefore(event.dateTo, 'minute');
export const isPastEvent = (event) => dayjs().isAfter(event.dateTo, 'minute');

