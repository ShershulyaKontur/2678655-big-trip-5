import { createFormCreateTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat, DEFAULT_CREATE_STATE } from '../../constants/const.js';
import dayjs from 'dayjs';

export default class CreateFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #closeHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #allDestinations = null;
  #offersTypes = null;
  #allOffers = [];

  constructor({ onSubmit, onClose, allDestinations, allOffers, offersTypes }) {
    super();
    this.#handleFormSubmit = onSubmit;
    this.#closeHandler = onClose;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#offersTypes = offersTypes;

    this._setState({
      ...DEFAULT_CREATE_STATE,
      isDisable: false,
      isSaving: false,
      isDeleting: false
    });

    this._restoreHandlers();
  }

  get template() {
    return createFormCreateTemplate(this._state, this.#allDestinations, this.#allOffers, this.#offersTypes);
  }

  get _isFormValid() {
    const isDestinationSelected = this._state.destination && this._state.destination !== '';
    const isDatesValid = this._state.dateFrom && this._state.dateTo && this._state.dateFrom < this._state.dateTo;
    const isPriceValid = this._state.basePrice > 0;

    return isDestinationSelected && isDatesValid && isPriceValid;
  }

  _restoreHandlers() {
    this.element.addEventListener('submit', this.#formSubmitHandler);

    this.element.querySelector('.event__reset-btn')
      .addEventListener('click', this.#cancelClickHandler);

    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);

    this.element.querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);

    this.element.querySelector('.event__input--price')
      .addEventListener('input', this.#priceChangeHandler);

    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });

    this.#updateSaveButton();
    this.#setDatepickers();
  }

  reset() {
    this._setState({
      ...DEFAULT_CREATE_STATE,
      isDisable: false,
      isSaving: false,
      isDeleting: false
    });
    this.#updateSaveButton();
  }

  #updateSaveButton  = () => {
    const saveButton = this.element?.querySelector('.event__save-btn');

    if (saveButton) {
      const isDisabled = !this._isFormValid || this._state.isSaving || this._state.isDisable;
      saveButton.disabled = isDisabled;
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const newEvent = {
      type: this._state.type,
      basePrice: Number(this._state.basePrice),
      dateFrom: this._state.dateFrom,
      dateTo: this._state.dateTo,
      destination: this._state.destination,
      offers: this._state.offers.map((offer) => offer.id),
      isFavorite: false
    };
    this.#handleFormSubmit(newEvent);
  };

  #cancelClickHandler = (evt) => {
    evt.preventDefault();
    this.#closeHandler();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    const newType = evt.target.value;

    this.updateElement({ type: newType, offers: [] });
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

    this.updateElement({
      destination: '',
      destinationById: {
        name: inputValue,
        description: '',
        pictures: []
      }
    });
    this.#updateSaveButton();
  };

  #priceChangeHandler = (evt) => {
    const input = evt.target;
    input.value = input.value.replace(/[^\d]/g, '');

    this._setState({ basePrice: Number(input.value) });
    this.#updateSaveButton();
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
      ? [...this._state.offers, offerToToggle]
      : this._state.offers.filter((offer) => offer.id !== offerId);

    this._setState({ offers: updatedOffers });
    this.#updateSaveButton();
  };

  #dateFromChangeHandler = ([userDate]) => {
    this._setState( {dateFrom: userDate} );
    this.#updateSaveButton();

    if (this.#datepickerTo) {
      this.#datepickerTo.set('minDate', userDate);
    }
  };

  #dateToChangeHandler = ([userDate]) => {
    this._setState( {dateTo: userDate} );
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
}
