import { createEventItemsTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EventItemView extends AbstractView {
  #data = null;

  constructor(data) {
    super();
    this.#data = data;
  }

  get template() {
    return createEventItemsTemplate(this.#data);
  }
}
