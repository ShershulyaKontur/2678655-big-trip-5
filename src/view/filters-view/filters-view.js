import { createFiltersTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class FiltersView extends AbstractView {
  get template() {
    return createFiltersTemplate();
  }
}
