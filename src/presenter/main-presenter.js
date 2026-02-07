import { render } from '../framework/render.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class MainPresenter {
  #model = null;
  #eventsContainer = null;

  #events = [];
  #sortComponent = new SortView();
  #emptyListComponent = new EmptyList();
  #eventListComponent = new EventListView();
  #eventPresenters = new Map();

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    this.#events = [...this.#model.events];
    this.#renderList();
  }

  #handleModeViewChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updateEvent) => {
    this.#events = updateItem(this.#events, updateEvent);
    this.#eventPresenters.get(updateEvent.id).init(updateEvent);
  };

  #renderEvent(event) {
    const eventDetails = this.#model.getEventDetails(event);
    const eventPresenter = new EventPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeViewChange: this.#handleModeViewChange
    });
    eventPresenter.init(eventDetails);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderList(){
    if (this.#model.isEmpty()) {
      this.#renderEmptyList();
    } else {
      this.#renderContent();
    }
  }

  #renderSort() {
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderListComponent() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderContent() {
    this.#renderSort();
    this.#renderListComponent();
    this.#renderEvents();
  }
}
