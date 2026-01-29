import { createFormEditTemplate } from './templates.js';
import AbstractView from '../../framework/view/abstract-view.js';

export default class EditFormView extends AbstractView{
  #handleSubmit = null;
  #handleClose = null;

  constructor({onSubmit,onClose}){
    super();
    this.#handleSubmit = onSubmit;
    this.#handleClose = onClose;
    this.element.addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  get template() {
    return createFormEditTemplate();
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };

  #closeHandler = () => {
    this.#handleClose();
  };
}
