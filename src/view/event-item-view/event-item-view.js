import { createEventItemsTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EventItemView extends AbstractView {
  #eventData = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({eventData, onEdit, onFavorite}) {
    super();
    this.#eventData = eventData;
    this.#handleEditClick = onEdit;
    this.#handleFavoriteClick = onFavorite;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItemsTemplate(this.#eventData);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
