import { createFormEditTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

export default class EditFormView extends AbstractStatefulView{
  #handleSubmit = null;
  #handleClose = null;
  #eventData = null;
  #typeOffers = null;
  #allDestinations = null;
  #pointDestination = null;

  constructor({eventData, onSubmit, onClose, typeOffers,pointDestination, allDestinations}){
    super();
    this.#eventData = eventData;
    this.#typeOffers = typeOffers;
    this.#allDestinations = allDestinations;
    this.#pointDestination = pointDestination;
    this.#handleSubmit = onSubmit;
    this.#handleClose = onClose;
    this.element.addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  get template() {
    return createFormEditTemplate(this.#eventData, this.#typeOffers, this.#allDestinations, this.#pointDestination);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };

  #closeHandler = () => {
    this.#handleClose();
  };
}
