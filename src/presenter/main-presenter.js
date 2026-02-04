import { render } from '../framework/render.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class MainPresenter {
  #model = null;
  #eventsContainer = null;

  #sortComponent = new SortView();
  #emptyListComponent = new EmptyList();
  #eventListComponent = new EventListView();

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    this.#renderList();
  }

  #renderEvent(point) {
    const eventPresenter = new EventPresenter({
      eventListComponent: this.#eventListComponent.element,
    });
    eventPresenter.init(this.#model.getEventDetails(point));
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderEvents() {
    this.#model.points.forEach((point) => this.#renderEvent(point));
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
