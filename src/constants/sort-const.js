import { sortEventDay, sortEventName, sortEventOffers,
  sortEventPrice, sortEventTime } from '../utils/sort-utils';

export const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

export const SortFns = {
  [SortType.DAY]: sortEventDay,
  [SortType.EVENT]: sortEventName,
  [SortType.TIME]: sortEventTime,
  [SortType.PRICE]: sortEventPrice,
  [SortType.OFFER]: sortEventOffers
};
