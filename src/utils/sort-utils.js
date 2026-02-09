import dayjs from 'dayjs';

export const sortEventDay = (eventA, eventB) => {
  const dateA = dayjs(eventA.dateFrom);
  const dateB = dayjs(eventB.dateFrom);
  return dateA - dateB;
};

export const sortEventName = (eventA, eventB) => {
  const nameA = eventA.type;
  const nameB = eventB.type;
  return nameA.localeCompare(nameB);
};

export const sortEventTime = (eventA, eventB) => {
  const timeA = dayjs(eventA.dateTo).diff(dayjs(eventA.dateFrom));
  const timeB = dayjs(eventB.dateTo).diff(dayjs(eventB.dateFrom));
  return timeB - timeA;
};

export const sortEventPrice = (eventA, eventB) => eventB.basePrice - eventA.basePrice;

export const sortEventOffers = (eventA, eventB) => eventB.offers.length - eventA.offers.length;
