import { getDestinations, getOffers, getEvents } from '../mock/mock-utils.js';
import Observable from '../framework/observable.js';

export default class Model extends Observable {
  #events = null;
  #offers = null;
  #destinations = null;

  constructor() {
    super();
    this.#events = getEvents();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
  }

  get events() {
    return this.#events;
  }

  get allEvents(){
    return this.events.map((event) => this.getEventDetails(event));
  }

  set events(events) {
    this.#events = [...events];
    this._notify(events);
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }


  updateEvent(updateType, update) {
    const index = this.events.findIndex((task) => task.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  getDestinationById(id) {
    return this.destinations?.find((el) => el.id === id) ?? null;
  }

  getOfferByType(type) {
    const group = this.offers?.find((el) => el.type === type);
    return group.offers ?? [];
  }

  getOffersForId(event) {
    const typeOffers = this.getOfferByType(event.type);
    return typeOffers.filter((offer) => event.offers.includes(offer.id));
  }

  getOffersTypes(){
    return this.offers?.map((offer) => offer.type) ?? [];
  }

  getEventDetails(event) {
    const destination = this.getDestinationById(event.destination);
    const offers = this.getOffersForId(event);

    return {...event, offers, destination};
  }
}
