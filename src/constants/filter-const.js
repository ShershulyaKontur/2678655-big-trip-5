import { isFuturePoint, isPastPoint, isPresentPoint } from '../utils/filters-utils';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const FILTER = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuturePoint(point)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentPoint(point)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastPoint(point))
};
