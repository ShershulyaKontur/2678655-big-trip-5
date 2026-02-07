import { FILTER } from '../constants/filter-const';

export const generateFilters = (events) =>
  Object.entries(FILTER).map(([type, fn]) => ({
    type,
    count: fn(events).length
  }));

