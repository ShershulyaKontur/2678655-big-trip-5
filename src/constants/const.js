export const ESC_KEY = 'Escape';

export const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
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
  DAY: 24 * 60 * 60 * 1000,
  MINUTES_IN_DAY: 24 * 60,
  MINUTES_IN_HOUR: 60
};

export const DEFAULT_CREATE_STATE = {
  type: 'flight',
  basePrice: '0',
  dateFrom: '',
  dateTo: '',
  destination: '',
  offers: []
};

