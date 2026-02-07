import { Filter } from '../constants/filter-const';

export const generateFilters = (events) =>
  Object.entries(Filter).map(([type, fn]) => ({
    type,
    count: fn(events).length
  }));

