import { getDestinations, getOffers, getEvents } from '../mock/mock-utils.js';

export default class Model {
  #events = null;
  #offers = null;
  #destinations = null;

  constructor() {
    this.#events = getEvents();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
  }

  get events() {
    return this.#events;
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  #getDestinationById(id) {
    return this.destinations?.find((el) => el.id === id) ?? null;
  }

  #getOfferByType(type) {
    const group = this.offers?.find((el) => el.type === type);
    return group.offers ?? [];
  }

  #getOffersForPoint(event) {
    const typeOffers = this.#getOfferByType(event.type);
    return typeOffers.filter((offer) => event.offers.includes(offer.id));
  }

  // isEmpty() {
  //   return this.events.length === 0;
  // }

  getEventDetails(event) {
    const destination = this.#getDestinationById(event.destination);
    const offers = this.#getOffersForPoint(event);

    return {
      ...event,
      offers,
      destination
    };
  }
}
