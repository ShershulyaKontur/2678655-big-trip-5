import { createEventItemsTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EventItemView extends AbstractView {
  #event = null;
  #destination = null;
  #offers = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({event,destination, offers, onEdit, onFavorite}) {
    super();
    this.#event = event;
    this.#handleEditClick = onEdit;
    this.#destination = destination;
    this.#offers = offers;
    this.#handleFavoriteClick = onFavorite;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createEventItemsTemplate(this.#event, this.#destination, this.#offers);
  }

  #editClickHandler = () => {
    this.#handleEditClick();
  };

  #favoriteClickHandler = () => {
    this.#handleFavoriteClick();
  };
}
