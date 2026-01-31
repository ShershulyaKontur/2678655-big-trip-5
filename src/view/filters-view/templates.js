import { FILTERS_TYPE } from '../../const/const.js';
import { capitalizeFirstLetter } from '../../utils/utils.js';

function createFiltersItemTemplate(type){
  const label = capitalizeFirstLetter(type);
  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}">
            <label class="trip-filters__filter-label" for="filter-${type}">${label}</label>
          </div>`;
}
export function createFiltersTemplate(){
  return `<form class="trip-filters" action="#" method="get">
            ${FILTERS_TYPE.map((type)=>createFiltersItemTemplate(type)).join('')}
            <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
}
