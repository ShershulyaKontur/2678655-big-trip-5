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

  getDestinationById(id) {
    return this.#destinations?.find((el) => el.id === id) ?? null;
  }

  getOfferByType(type) {
    return this.#offers?.find((el) => el.type === type) ?? [];
  }
}
