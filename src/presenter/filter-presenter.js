import FiltersView from '../view/filters-view/filters-view.js';
import { render, remove } from '../framework/render.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = null;
  #filterData = null;

  constructor({ filtersContainer, filterData }) {
    this.#filterData = filterData;
    this.#filtersContainer = filtersContainer;
  }

  init() {
    this.#filtersComponent = new FiltersView(this.#filterData);
    render(this.#filtersComponent, this.#filtersContainer);
  }

  destroy() {
    if (this.#filtersComponent) {
      remove(this.#filtersComponent);
      this.#filtersComponent = null;
    }
  }
}
