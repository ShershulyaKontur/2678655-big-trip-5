import { createEventItemsTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EventItemView extends AbstractView {
  #data = null;
  #handleClick = null;

  constructor(data, {onEdit}) {
    super();
    this.#data = data;
    this.#handleClick = onEdit;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createEventItemsTemplate(this.#data);
  }

  #clickHandler = () => {
    this.#handleClick();
  };
}
