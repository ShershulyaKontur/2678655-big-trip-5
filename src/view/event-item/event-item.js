import { createEventItemsTemplate } from "./templates.js";
import { createElement } from '../../render.js';

export default class EventItem {
  getTemplate() {
    return createEventItemsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
