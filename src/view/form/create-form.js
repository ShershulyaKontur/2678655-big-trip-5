import { createFormCreateTemplate } from "./templates.js";
import { createElement } from '../../render.js';

export default class CreateForm {
  getTemplate() {
    return createFormCreateTemplate();
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
