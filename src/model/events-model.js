import Observable from '../framework/observable.js';
import { UpdateType } from '../constants/const.js';

export default class EventsModel extends Observable {
  #events = [];
  #offers = null;
  #destinations = null;
  #eventsApiService = null;

  constructor({eventsApiService}) {
    super();
    this.#eventsApiService = eventsApiService;
  }

  async init() {
    try {
      const [events, destinations, offers] = await Promise.all([
        this.#eventsApiService.events,
        this.#eventsApiService.destinations,
        this.#eventsApiService.offers
      ]);

      this.#events = events.map(this.#adaptToClient);
      this.#destinations = destinations;
      this.#offers = offers;
    } catch(err) {
      this.#events = [];
      this.#offers = [];
      this.#destinations = [];
      this._notify(UpdateType.ERROR, { error: err });
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
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

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventsApiService.addEvent(update);
      const newEvent = this.#adaptToClient(response);
      this.#events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);
    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async updateEvent(updateType, update) {
    const updatedEvents = this.events.map((event) =>
      event.id === update.id ? update : event
    );

    if (updatedEvents.every((event, index) => event === this.events[index])) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#eventsApiService.updateEvent(update);
      const updatedEvent = this.#adaptToClient(response);
      this.#events = updatedEvents;
      this._notify(updateType, updatedEvent);
    } catch(err) {
      throw new Error('Can\'t update event');
    }
  }

  async deleteEvent(updateType, update) {
    const filteredEvents = this.events.filter((event) => event.id !== update.id);

    if (filteredEvents.length === this.events.length) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventsApiService.deleteEvent(update);
      this.#events = filteredEvents;
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }

  getDestinationById(id) {
    return this.destinations?.find((el) => el.id === id) ?? null;
  }

  getOfferByType(type) {
    const group = this.offers?.find((el) => el.type === type);
    return group?.offers ?? [];
  }

  getOffersForId(event) {
    const typeOffers = this.getOfferByType(event.type);
    return typeOffers.filter((offer) => event.offers.includes(offer.id));
  }

  getOffersTypes() {
    return this.offers?.map((offer) => offer.type) ?? [];
  }

  #adaptToClient(event) {
    const adaptedTask = {
      ...event,
      basePrice: event['base_price'],
      isFavorite: event['is_favorite'],
      dateTo: event['date_to'],
      dateFrom: event['date_from'],
    };

    delete adaptedTask['base_price'];
    delete adaptedTask['is_favorite'];
    delete adaptedTask['date_to'];
    delete adaptedTask['date_from'];

    return adaptedTask;
  }
}
