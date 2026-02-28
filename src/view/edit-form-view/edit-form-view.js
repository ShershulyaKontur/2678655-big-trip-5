import { createFormEditTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat } from '../../constants/const.js';

export default class EditFormView extends AbstractStatefulView{
  #handleFormSubmit = null;
  #closeHandler = null;
  #allDestinations = [];
  #destinationById = null;
  #allOffers = null;
  #offersTypes = null;
  #originalState = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #allСities = null;
  #handleDeleteClick = null;

  constructor({event, allOffers, offersByType, offersTypes, allDestinations, destinationById, onSubmit, onClose, onDelete}){
    super();
    this.#allDestinations = allDestinations;
    this.#allСities = this.#allDestinations.map((dest) => dest.name);
    this.#destinationById = destinationById;
    this.#allOffers = allOffers;
    this.#offersTypes = offersTypes;
    this.#handleFormSubmit = onSubmit;
    this.#closeHandler = onClose;
    this.#handleDeleteClick = onDelete;
    this.#originalState = structuredClone({...event});
    this._setState(EditFormView.parseEventToState(event, offersByType, destinationById));
    this._restoreHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state, this.#allСities, this.#offersTypes);
  }

  get _isFormValid() {
    const isDestinationSelected = this._state.destination && this._state.destination !== '';
    const isDatesValid = this._state.dateFrom && this._state.dateTo && this._state.dateFrom < this._state.dateTo;
    const isPriceValid = this._state.basePrice > 0;

    return isDestinationSelected && isDatesValid && isPriceValid;
  }

  reset() {
    this.updateElement(this.#originalState);
    this.#updateSaveButton();
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

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#deleteHandler);

    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    this.#updateSaveButton();
    this.#setDatepickers();
  }

  #updateSaveButton = () => {
    const saveButton = this.element?.querySelector('.event__save-btn');

    if (saveButton) {
      const isDisabled = !this._isFormValid || this._state.isSaving || this._state.isDisable;
      saveButton.disabled = isDisabled;
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToEvent(this._state));
  };

  #editRollUpHandler = (evt) => {
    evt.preventDefault();
    this.#closeHandler();
  };

  #offerChangeHandler = (evt) => {
    const offerId = evt.target.id.replace('event-offer-', '');
    const isChecked = evt.target.checked;
    const typeOffers = this.#allOffers.find((offer) => offer.type === this._state.type)?.offers || [];
    const offerToToggle = typeOffers.find((offer) => offer.id === offerId);

    if (!offerToToggle) {
      return;
    }

    const updatedOffers = isChecked
      ? [...this._state.offers, offerId]
      : this._state.offers.filter((id) => id !== offerId);

    this.updateElement({ offers: updatedOffers });
    this.#updateSaveButton();
  };

  #typeListChangeHandler = (evt) => {
    evt.preventDefault();
    const targetType = evt.target.value;
    const typeOffers = this.#allOffers.find((item) => item.type === targetType);

    this.updateElement({
      type: targetType,
      allOffersType: typeOffers?.offers || [],
      offers: []
    });
    this.#updateSaveButton();
  };

  #destinationChangeHandler = (evt) => {
    const inputValue = evt.target.value;
    const newDestination = this.#allDestinations.find((item) => item.name === inputValue);

    if (newDestination) {
      this.updateElement({
        destination: newDestination.id,
        destinationById: newDestination,
      });
      this.#updateSaveButton();
      return;
    }

    this._setState({
      destination: null,
      destinationById: {
        name: inputValue,
        description: '',
        pictures: []
      },
    });
    this.#updateSaveButton();
  };

  #priceChangeHandler = (evt) => {
    const input = evt.target;
    input.value = input.value.replace(/[^\d]/g, '');
    this._setState({ basePrice: Number(input.value) });
    this.#updateSaveButton();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
    this.#updateSaveButton();

    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', userDate);
    }
  };

  #dateToChangeHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
    this.#updateSaveButton();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.set('maxDate', userDate);
    }
  };

  #setDatepickers() {
    const fromInput = this.element.querySelector('#event-start-time-1');
    const toInput = this.element.querySelector('#event-end-time-1');

    fromInput.value = this._state.dateFrom ?
      dayjs(this._state.dateFrom).format(DateFormat.FULL_DATE_FORMAT) : '';
    toInput.value = this._state.dateTo ?
      dayjs(this._state.dateTo).format(DateFormat.FULL_DATE_FORMAT) : '';

    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
        maxDate: this._state.dateTo || null,
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        onChange: this.#dateToChangeHandler,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom || null,
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

  #deleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditFormView.parseStateToEvent(this._state));
  };

  static parseEventToState(event, offersByType, destinationById) {
    return {
      ...event,
      destinationById,
      destination: event.destination,
      allOffersType: offersByType,
      isDisable:false,
      isSaving:false,
      isDeleting:false
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.allOffersType;
    delete event.destinationById;
    delete event.isDisable;
    delete event.isSaving;
    delete event.isDeleting;

    return event;
  }
}
