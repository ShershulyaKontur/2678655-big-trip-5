import { FilterType } from '../../constants/filter-const.js';
import { capitalizeFirstLetter } from '../../utils/utils.js';

function createFiltersItemTemplate({ type, count }) {
  const label = capitalizeFirstLetter(type);

  return `<div class="trip-filters__filter">
            <input
              id="filter-${type}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${type}"
              ${type === FilterType.EVERYTHING ? 'checked' : ''}
              ${count === 0 ? 'disabled' : ''}
            >
            <label class="trip-filters__filter-label" for="filter-${type}">${label}</label>
          </div>`;
}

export function createFiltersTemplate(filters) {
  return `<form class="trip-filters" action="#" method="get">
            ${filters.map(createFiltersItemTemplate).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}
