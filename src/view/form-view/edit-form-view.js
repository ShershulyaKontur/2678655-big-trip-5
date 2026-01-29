import { createFormEditTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EditFormView extends AbstractView{
  get template() {
    return createFormEditTemplate();
  }
}
