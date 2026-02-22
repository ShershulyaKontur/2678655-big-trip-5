import { NoEventsTextType } from '../../constants/filter-const';

export function createEmptyListTemplate(filterType){
  const text = NoEventsTextType[filterType] || 'Вы никуда не летите!';
  return `<p class="trip-events__msg">${text}</p>`;
}
