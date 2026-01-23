import { createFormEditTemplate } from "./templates.js";
import { createElement } from '../../render.js';

export default class EditForm {
  getTemplate() {
    return createFormEditTemplate();
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
