import { filter } from '../constants/filter-const';

export const generateFilters = (points) =>
  Object.entries(filter).map(([type, fn]) => ({
    type,
    count: fn(points).length
  }));

