import { render } from '../framework/render.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { updateItem } from '../utils/utils.js';

export default class MainPresenter {
  #model = null;
  #eventsContainer = null;

  #points = [];
  #sortComponent = new SortView();
  #emptyListComponent = new EmptyList();
  #eventListComponent = new EventListView();
  #eventsPresenter = new Map();

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    this.#points = [...this.#model.points];
    this.#renderList();
  }

  #handleEventChange = (updateEvent) => {
    this.#points = updateItem(this.#points, updateEvent);
    this.#eventsPresenter.get(updateEvent.id).init(updateEvent);
  };

  #renderPoint(point) {
    const eventDetails = this.#model.getEventDetails(point);
    const eventPresenter = new EventPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange
    });
    eventPresenter.init(eventDetails);
    this.#eventsPresenter.set(point.id, eventPresenter);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderEvents() {
    this.#points.forEach((point) => this.#renderPoint(point));
  }

  #renderList(){
    if (this.#model.isEmpty()) {
      this.#renderEmptyList();
    } else {
      this.#renderContent();
    }
  }

  #renderSort(){
    render(this.#sortComponent, this.#eventsContainer);
  }

  #renderListComponent(){
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderContent(){
    this.#renderSort();
    this.#renderListComponent();
    this.#renderEvents();
  }
}
