import { createSortTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class SortView extends AbstractView {
  #handleSortTypeChange = null;
  #activeType = null;

  constructor({onSortTypeChange, activeType}){
    super();
    this.#activeType = activeType;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#activeType);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
