import { capitalizeFirstLetter } from '../../utils/utils.js';

function createFiltersItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;
  const label = capitalizeFirstLetter(type);
  return `<div class="trip-filters__filter">
            <input
              id="filter-${type}"
              class="trip-filters__filter-input  visually-hidden"
              type="radio"
              name="trip-filter"
              value="${type}"
              ${type === currentFilterType ? 'checked' : ''}
              ${count === 0 ? 'disabled' : ''}
            >
            <label class="trip-filters__filter-label" for="filter-${type}">${label}</label>
          </div>`;
}

export function createFiltersTemplate(filters, currentFilterType) {
  return `<form class="trip-filters" action="#" method="get">
            ${filters.map((filter) => createFiltersItemTemplate(filter, currentFilterType)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}
