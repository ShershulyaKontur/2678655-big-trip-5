import { createEmptyListTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EmptyList extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
