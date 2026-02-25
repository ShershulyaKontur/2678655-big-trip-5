import { createEmptyListTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EmptyList extends AbstractView {
  #filterType = null;

  constructor({filterType}){
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
