export const ESC_KEY = 'Escape';

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

export const DateFormat = {
  DATE_FROM_FORMAT: 'MMM D',
  FULL_DATE_FORMAT: 'DD/MM/YY HH:mm',
  FLATPICKR_FORMAT: 'd/m/y H:i',
  DURATION_MINUTES: 'mm[M]',
  DURATION_HOURS_MINUTES: 'HH[H] mm[M]',
  DURATION_DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

export const DurationThresholds = {
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  MINUTE: 60 * 1000,
  MINUTES_IN_DAY: 24 * 60,
  MINUTES_IN_HOUR: 60
};

export const DEFAULT_CREATE_STATE = {
  type: 'flight',
  basePrice: '1111',
  dateFrom: '2026-02-23T10:24:00Z',
  dateTo: '2026-02-23T11:24:00Z',
  destination: 3,
  offers: [10, 11, 12]
};

