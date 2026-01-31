import { createEventListTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EventListView extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
