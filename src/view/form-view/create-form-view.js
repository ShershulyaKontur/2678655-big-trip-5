import { createFormCreateTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class CreateFormView extends AbstractView{
  get template() {
    return createFormCreateTemplate();
  }
}
