import { FILTER } from '../constants/filter-const';

export const generateFilters = (points) =>
  Object.entries(FILTER).map(([type, fn]) => ({
    type,
    count: fn(points).length
  }));

