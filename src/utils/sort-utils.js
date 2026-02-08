export const sortEventDay = (eventA, eventB) => {
  const dateA = new Date(`${eventA.dateFrom} GMT+0700`);
  const dateB = new Date(`${eventB.dateFrom} GMT+0700`);
  return dateA - dateB;
};

export const sortEventName = (eventA, eventB) => {
  const nameA = eventA.type;
  const nameB = eventB.type;
  return nameA.localeCompare(nameB);
};

export const sortEventTime = (eventA, eventB) => {
  const timeA = new Date(eventA.dateTo) - new Date(eventA.dateFrom);
  const timeB = new Date(eventB.dateTo) - new Date(eventB.dateFrom);
  return timeA - timeB;
};

export const sortEventPrice = (eventA, eventB) => eventA.basePrice - eventB.basePrice;

export const sortEventOffers = (eventA, eventB) => eventA.offers.length - eventB.offers.length;

