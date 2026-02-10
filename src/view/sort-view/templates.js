import { SortType } from '../../constants/sort-const';

function createSortItemTemplate([, value], activeType) {
  const isChecked = value === activeType ? 'checked' : '';
  return `<div class="trip-sort__item  trip-sort__item--${value}">
            <input
              id="sort-${value}"
              class="trip-sort__input  visually-hidden"
              type="radio"
              name="trip-sort"
              value="${value}"
              data-sort-type="${value}"
              ${isChecked}>
            <label class="trip-sort__btn" for="sort-${value}">${value}</label>
          </div>`;
}

export function createSortTemplate(activeType) {
  return `<form class="trip-sort" action="#" method="get">
    ${Object.entries(SortType)
    .map(([key, value]) => createSortItemTemplate([key, value], activeType)).join('')}
  </form>`;
}
