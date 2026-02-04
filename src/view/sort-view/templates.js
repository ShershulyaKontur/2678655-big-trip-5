import { SORT_TYPE } from '../../constants/mock-const';
import { capitalizeFirstLetter } from '../../utils/utils';

function createSortItemTemplate(type){
  const label = capitalizeFirstLetter(type);
  return `<div class="trip-sort__item  trip-sort__item--${type}">
            <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" checked>
            <label class="trip-sort__btn" for="sort-${type}">${label}</label>
          </div>`;
}
export function createSortTemplate(){
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${SORT_TYPE.map((type)=>createSortItemTemplate(type)).join('')}
          </form>`;
}
