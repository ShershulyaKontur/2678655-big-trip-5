import { getDestinations, getOffers, getEvents } from '../mock/mock-utils.js';
import Observable from '../framework/observable.js';

export default class EventsModel extends Observable {
  #events = null;
  #offers = null;
  #destinations = null;
  #eventsApiService = null;


  constructor({eventsApiService}) {
    super();
    this.#events = getEvents();
    this.#offers = getOffers();
    this.#destinations = getDestinations();
    this.#eventsApiService = eventsApiService;

    this.#eventsApiService.events.then((events) => {
      console.log(events)
      console.log(events.map(this.#adaptToClient));
    })
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

  addEvent(updateType, update) {
    this.events = [update, ...this.events];
    this._notify(updateType, update);
  }

  updateEvent(updateType, update) {
    const updatedEvents = this.events.map((event) =>
      event.id === update.id ? update : event
    );

    if (updatedEvents.every((event, index) => event === this.events[index])) {
      throw new Error('Can\'t update unexisting task');
    }

    this.events = updatedEvents;
    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const filteredEvents = this.events.filter((event) => event.id !== update.id);

    if (filteredEvents.length === this.events.length) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.events = filteredEvents;
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

  #adaptToClient(event) {
    const adaptedTask = {...event,
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
