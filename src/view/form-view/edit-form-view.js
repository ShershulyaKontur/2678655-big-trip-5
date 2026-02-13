import { createFormEditTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

export default class EditFormView extends AbstractStatefulView{
  #handleSubmit = null;
  #handleClose = null;
  #eventData = null;
  #typeOffers = null;
  #allDestinations = null;

  constructor({eventData, onSubmit, onClose, typeOffers, allDestinations}){
    super();
    this.#eventData = eventData;
    this.#typeOffers = typeOffers;
    this.#allDestinations = allDestinations;
    this.#handleSubmit = onSubmit;
    this.#handleClose = onClose;
    this._setState(EditFormView.parseEventToState(eventData, typeOffers))
    this.element.addEventListener('submit', this.#submitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeHandler);
  }

  get template() {
    return createFormEditTemplate(this.#eventData, this.#typeOffers, this.#allDestinations);
  }

  #submitHandler = (evt) => {
    evt.preventDefault();
    this.#handleSubmit();
  };

  #closeHandler = () => {
    this.#handleClose();
  };

  static parseEventToState(eventData, typeOffers) {
    return {
      ...eventData,
      typeOffers
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};

    delete event.typeOffers;

    return event;
  }
}

