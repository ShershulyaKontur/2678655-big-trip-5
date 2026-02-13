import { createFormEditTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';

export default class EditFormView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #closeHandler = null;
  #allDestinations = [];
  #allOffers = null;
  #originalState = null;

  constructor({eventData, typeOffers, allDestinations, allOffers, onSubmit, onClose}){
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onSubmit;
    this.#closeHandler = onClose;
    this.#originalState = structuredClone({...eventData});
    this._setState(EditFormView.parseEventToState(eventData, typeOffers));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allDestinations);
  }
  reset() {
    this.updateElement(this.#originalState);
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editRollUpHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeListChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToEvent(this._state));
  };

  #editRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#closeHandler();
  };

  #typeListChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType);

    this.updateElement({
      type: targetType,
      allOffersType: typeOffers.offers,
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === targetDestination);
    this.updateElement({
      destination: newDestination
    });
  };


  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = evt.target.value;
    this._setState({
      basePrice: newPrice
    });
  };

  static parseEventToState(eventData, typeOffers) {
    return {
      ...eventData,
      allOffersType: typeOffers
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.allOffersType;

    return event;
  }
}

