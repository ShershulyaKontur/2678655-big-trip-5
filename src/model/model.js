import { getDestinations, getOffers, getPoints } from '../mock/mock-utils.js';

export default class Model {
  #points = null;
  #offers = null;
  #destinations = null;

  constructor() {
    this.#points = getPoints();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
  }

  get points() {
    return this.#points;
  }

  #getDestinationById(id) {
    return this.#destinations?.find((el) => el.id === id) ?? null;
  }

  #getOfferByType(type) {
    const group = this.#offers?.find((el) => el.type === type);
    return group.offers ?? [];
  }

  #getOffersForPoint(point) {
    const typeOffers = this.#getOfferByType(point.type);
    return typeOffers.filter((offer) => point.offers.includes(offer.id));
  }

  getEventDetails(point) {
    return {
      point,
      destination: this.#getDestinationById(point.destination),
      offers: this.#getOffersForPoint(point)
    };
  }
}
