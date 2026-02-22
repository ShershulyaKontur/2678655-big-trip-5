import { isFutureEvent, isPastEvent, isPresentEvent } from '../utils/filters-utils';

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

export const Filter = {
  [FilterType.EVERYTHING]: (events) => events.slice(),
  [FilterType.FUTURE]: (events) => events.filter((event) => isFutureEvent(event)),
  [FilterType.PRESENT]: (events) => events.filter((event) => isPresentEvent(event)),
  [FilterType.PAST]: (events) => events.filter((event) => isPastEvent(event))
};

export const NoEventsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no future events now',
};
