import { render, replace } from '../framework/render.js';
import FiltersView from '../view/filters-view/filters-view.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view/form-view/edit-form-view.js';
import { ESC_KEY } from '../const/const.js';

export default class Presenter {
  #model = null;
  #filtersContainer = null;
  #eventsContainer = null;
  #sortComponent = null;
  #eventListComponent = null;
  #filtersComponent = null;

  constructor({ model, filtersContainer, eventsContainer }) {
    this.#model = model;
    this.#filtersContainer = filtersContainer;
    this.#eventsContainer = eventsContainer;
  }

  #prepareEventData(point) {
    const destination = this.#model.getDestinationById(point.destination);
    const typeOffers = this.#model.getOfferByType(point.type);
    const offers = typeOffers.offers?.filter((offer) => point.offers.includes(offer.id)) || [];
    return { point, offers, destination };
  }

  #renderEvent(point) {
    const eventData = this.#prepareEventData(point);
    const escKeyDownHandler = (evt) => {
      if (evt.key === ESC_KEY) {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const editForm = new EditFormView({
      onSubmit: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onClose: () => {
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });
    const eventItem = new EventItemView(eventData, {
      onClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceFormToEvent() {
      replace(eventItem, editForm);
    }

    function replaceEventToForm() {
      replace(editForm, eventItem);
    }

    render(eventItem, this.#eventListComponent.element);
  }

  renderEvents() {
    this.#model.points.forEach((point) =>
      this.#renderEvent(point)
    );
  }

  init() {
    this.#filtersComponent = new FiltersView();
    this.#sortComponent = new SortView();
    this.#eventListComponent = new EventListView();

    render(this.#filtersComponent, this.#filtersContainer);
    render(this.#sortComponent, this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);
    this.renderEvents();
  }
}
