import AbstractView from '../../framework/view/abstract-view.js';
import { createFaledLoadDataTemplate } from './templates.js';

export default class LoadingErrorView extends AbstractView {
  get template() {
    return createFaledLoadDataTemplate();
  }
}
