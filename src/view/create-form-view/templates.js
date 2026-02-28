import { DateFormat } from '../../constants/const';
import { humanizePointDueDate } from '../../utils/formatter';
import he from 'he';

function createOffersItemTemplate(offer, selectedOffers, isDisabled) {
  const isChecked = selectedOffers.some((selectedOffer) => selectedOffer.id === offer.id);

  return `<div class="event__offer-selector">
    <input class="event__offer-checkbox visually-hidden"
      id="event-offer-${offer.id}"
      type="checkbox"
      name="event-offer-${offer.id}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label class="event__offer-label" for="event-offer-${offer.id}">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </label>
  </div>`;
}

export function createFormCreateTemplate(state, allDestinations, allOffers, offersTypes) {
  const {
    type,
    offers,
    basePrice,
    dateFrom,
    dateTo,
    destinationById = {},
    isDisable,
    isSaving,
    isDeleting
  } = state;

  const cityData = destinationById;
  const { name = '', description = '', pictures = [] } = cityData || {};
  const typeOffers = allOffers.find((item) => item.type === type)?.offers || [];
  const startDay = humanizePointDueDate(dateFrom, DateFormat.FULL_DATE_FORMAT);
  const endDay = humanizePointDueDate(dateTo, DateFormat.FULL_DATE_FORMAT);


  const saveButtonText = isSaving ? 'Saving...' : 'Save';
  const isResetButtonDisabled = isDisable || isDeleting;

  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group" ${isDisable ? 'disabled' : ''}>
            <legend class="visually-hidden">Event type</legend>
            ${offersTypes.map((typeOption) => `
            <div class="event__type-item">
              <input id="event-type-${typeOption}-1"
                class="event__type-input visually-hidden"
                type="radio"
                name="event-type"
                value="${typeOption}"
                ${typeOption === type ? 'checked' : ''}
                ${isDisable ? 'disabled' : ''}>
              <label class="event__type-label event__type-label--${typeOption}"
                for="event-type-${typeOption}-1">
                ${typeOption.charAt(0).toUpperCase() + typeOption.slice(1)}
              </label>
            </div>
              `).join('')}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group event__field-group--destination">
        <label class="event__label event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input event__input--destination"
          id="event-destination-1"
          type="text"
          name="event-destination"
          value="${he.encode(name)}"
          list="destination-list-1"
          ${isDisable ? 'disabled' : ''}>
        <datalist id="destination-list-1">
          ${allDestinations.map((dest) => `<option value="${dest.name}"></option>`).join('')}
        </datalist>
      </div>

      <div class="event__field-group event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input event__input--time"
               id="event-start-time-1"
               type="text"
               name="event-start-time"
               value="${startDay}"
               ${isDisable ? 'disabled' : ''}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input event__input--time"
               id="event-end-time-1"
               type="text"
               name="event-end-time"
               value="${endDay}"
               ${isDisable ? 'disabled' : ''}>
      </div>

      <div class="event__field-group event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input event__input--price"
          id="event-price-1"
          type="text"
          name="event-price"
          value="${basePrice}"
          ${isDisable ? 'disabled' : ''}>
      </div>

      <button class="event__save-btn btn btn--blue"
        type="submit">
        ${saveButtonText}
      </button>

      <button class="event__reset-btn"
        type="reset" \
        ${isResetButtonDisabled ? 'disabled' : ''}>
        Cancel
      </button>
    </header>

    <section class="event__details">
      ${typeOffers.length > 0 ? `
        <section class="event__section event__section--offers">
          <h3 class="event__section-title event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${typeOffers.map((offerItem) =>
              createOffersItemTemplate(offerItem, offers, isDisable)
            ).join('')}
          </div>
        </section>
      ` : ''}

      ${description ? `
        <section class="event__section event__section--destination">
          <h3 class="event__section-title event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          ${pictures.length > 0 ? `
            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${pictures.map((picture) => `
                  <img class="event__photo" src="${picture.src}" alt="${picture.description}">
                `).join('')}
              </div>
            </div>
          ` : ''}
        </section>
      ` : ''}
    </section>
  </form>`;
}
