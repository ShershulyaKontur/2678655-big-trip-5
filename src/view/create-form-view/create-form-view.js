import { createFormCreateTemplate } from './templates.js';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateFormat } from '../../constants/const.js';

export default class CreateFormView extends AbstractStatefulView {
  #handleFormSubmit = null;
  #closeHandler = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #allDestinations = null;
  #allOffers = [];

  constructor({ onSubmit, onClose, allDestinations, allOffers }) {
    super();
    this.#handleFormSubmit = onSubmit;
    this.#closeHandler = onClose;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;

    this._setState(this.#getDefaultState());
    this._restoreHandlers();
  }

  #getDefaultState() {
    return {
      type: 'flight',
      basePrice: '1111',
      dateFrom:'2026-02-23T10:24:00Z',
      dateTo: '2026-02-23T11:24:00Z',
      destination: {
        id: 3,
        description: 'NSK - with a beautiful old town',
        name: 'NSK',
        pictures: [
          {
            src: 'https://24.objects.htmlacademy.pro/static/destinations/18.jpg',
            description: 'Rome a true asian pearl'
          },

        ]
      },
      offers: []
    };
  }

  get template() {
    return createFormCreateTemplate(this._state, this.#allDestinations, this.#allOffers);
  }

  reset() {
    this.updateElement(this.#getDefaultState());
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

    this.#setDatepickers();
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const newEvent = {
      type: this._state.type,
      basePrice: Number(this._state.basePrice) || 0,
      dateFrom: this._state.dateFrom,
      dateTo: this._state.dateTo,
      destination: this._state.destination,
      offers: this._state.offers,
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

    this.updateElement({
      type: newType,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const targetDestination = evt.target.value;
    const newDestination = this.#allDestinations.find(
      (item) => item.name.toLowerCase() === targetDestination.toLowerCase()
    );

    if (newDestination) {
      this.updateElement({
        destination: newDestination
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  #offerChangeHandler = (evt) => {
    const offerId = parseInt(evt.target.id.replace('event-offer-', ''), 10);
    const isChecked = evt.target.checked;

    const typeOffers = this.#allOffers.find((offer) => offer.type === this._state.type)?.offers || [];

    const offerToToggle = typeOffers.find((offer) => offer.id === offerId);
    if (!offerToToggle) {
      return;
    }

    const updatedOffers = isChecked
      ? [...this._state.offers, offerToToggle]
      : this._state.offers.filter((offer) => offer.id !== offerId);

    this.updateElement({ offers: updatedOffers });
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

  #setDatepickers() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      }
    );

    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: DateFormat.FLATPICKR_FORMAT,
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
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
