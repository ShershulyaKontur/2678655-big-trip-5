import { DateFormat } from '../../constants/const.js';
import { humanizePointDueDate } from '../../utils/formatter.js';
import { capitalizeFirstLetter } from '../../utils/utils.js';
import he from 'he';

function createCountryOptionTemplate(country) {
  return `<option value="${country}"></option>`;
}

function createImageTemplate({src, description}){
  return `<img class="event__photo" src=${src} alt="${description}">`;
}

function createEventTypeItemTemplate(type, index) {
  const label = capitalizeFirstLetter(type);
  return `<div class="event__type-item">
            <input id="event-type-${type}-${index + 1}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
            <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${index + 1}">${label}</label>
          </div>`;
}

function createOffersItemTemplate(offer, selectedOffers, isDisabled) {
  const {title, price, id} = offer;
  const isChecked = selectedOffers.some((selectedOffer) => selectedOffer === id);

  return `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden"
              id="event-offer-${id}"
              type="checkbox"
              name="event-offer-${id}"
              value="${id}"
              ${isChecked ? 'checked' : ''}
              ${isDisabled ? 'disabled' : ''}
            >
            <label class="event__offer-label" for="event-offer-${id}">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </label>
          </div>`;
}

export function createFormEditTemplate(state, destinationsData, offersTypes){
  const {
    type,
    offers,
    allOffersType,
    basePrice,
    dateFrom,
    dateTo,
    isDisable,
    isSaving,
    isDeleting
  } = state;
  const { name , description = '', pictures = [] } = state.destinationById || {};

  const startDay = humanizePointDueDate(dateFrom, DateFormat.FULL_DATE_FORMAT);
  const endDay = humanizePointDueDate(dateTo, DateFormat.FULL_DATE_FORMAT);

  const resetButtonText = isDeleting ? 'Deleting...' : 'Delete';
  const saveButtonText = isSaving ? 'Saving...' : 'Save';
  const isResetButtonDisabled = isDisable || isDeleting;

  return `<form class="event event--edit" action="#" method="post" >
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Event type</legend>
                    ${offersTypes.map((offerType, index) => createEventTypeItemTemplate(offerType, index)).join('')}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type}
                </label>
                <input class="event__input  event__input--destination"
                  id="event-destination-1"
                  type="text"
                  name="event-destination"
                  value="${he.encode(name)}"
                  list="destination-list-1"
                  ${isDisable ? 'disabled' : ''}
                >
                <datalist id="destination-list-1">
                  ${destinationsData.map((destination) => createCountryOptionTemplate(destination)).join('')}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">From</label>
                <input class="event__input  event__input--time"
                  id="event-start-time-1"
                  type="text"
                  name="event-start-time"
                  value="${startDay}"
                  ${isDisable ? 'disabled' : ''}
                >
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">To</label>
                <input class="event__input  event__input--time"
                  id="event-end-time-1"
                  type="text"
                  name="event-end-time"
                  value="${endDay}"
                  ${isDisable ? 'disabled' : ''}
                >
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  &euro;
                </label>
                <input class="event__input  event__input--price"
                  id="event-price-1"
                  type="text"
                  name="event-price"
                  value="${basePrice}"
                  ${isDisable ? 'disabled' : ''}
                >
              </div>

              <button class="event__save-btn  btn  btn--blue"
                type="submit">
                ${saveButtonText}
              </button>

              <button class="event__reset-btn"
                type="reset"
                ${isResetButtonDisabled ? 'disabled' : ''}
              >
                ${resetButtonText}
              </button>

              <button class="event__rollup-btn" type="button" ${isDisable ? 'disabled' : ''}>
                <span class="visually-hidden">Open event</span>
              </button>
            </header>

            <section class="event__details">
              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                <div class="event__available-offers">
                  ${allOffersType.map((offer) => createOffersItemTemplate(offer, offers, isDisable)).join('')}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>
                <div class="event__photos-container">
                  <div class="event__photos-tape">
                    ${pictures.map((picture) => createImageTemplate(picture)).join('')}
                  </div>
                </div>
              </section>
            </section>
          </form>`;
}
