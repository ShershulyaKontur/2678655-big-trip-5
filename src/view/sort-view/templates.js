import { SORT_TYPE } from '../../constants/mock-const';

function createSortItemTemplate([_, value]) {
  return `<div class="trip-sort__item trip-sort__item--${value}">
            <input
              id="sort-${value}"
              class="trip-sort__input visually-hidden"
              type="radio"
              name="trip-sort"
              value="${value}"
              data-sort-type="${value}"
              ${value === 'day' ? 'checked' : ''}>
            <label class="trip-sort__btn" for="sort-${value}">${value}</label>
          </div>`;
}

export function createSortTemplate() {
  return `<form class="trip-sort" action="#" method="get">
            ${Object.entries(SORT_TYPE).map(createSortItemTemplate).join('')}
          </form>`;
}
