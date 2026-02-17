import { createFormEditTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat } from '../../constants/const.js';

export default class EditFormView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #closeHandler = null;
  #allDestinations = [];
  #allOffers = null;
  #offersTypes = null;
  #originalState = null;
  #datepickerFrom = null;
  #datepickerTo = null;


  constructor({eventData, allOffers, offersByType, offersTypes, allDestinations, onSubmit, onClose}){
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#offersTypes = offersTypes;
    this.#handleFormSubmit = onSubmit;
    this.#closeHandler = onClose;
    this.#originalState = structuredClone({...eventData});
    this._setState(EditFormView.parseEventToState(eventData, offersByType));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allDestinations, this.#offersTypes);
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

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
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

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #setDatepickerFrom() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo,
      }
    );
  }

  #setDatepickerTo() {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
        minDate: this._state.dateFrom,
      }
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
  }

  static parseEventToState(eventData, offersByType) {
    return {
      ...eventData,
      allOffersType: offersByType
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.allOffersType;

    return event;
  }
}

