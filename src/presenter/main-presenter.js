import { render, replace } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { SortType } from '../constants/sort-const.js';
import { SortFns } from '../constants/sort-const.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class MainPresenter {
  #model = null;
  #eventsContainer = null;
  #sortComponent = null;
  #events = [];

  #emptyListComponent = new EmptyList();
  #eventListComponent = new EventListView();
  #currentSortType = SortType.DAY;
  #eventPresenters = new Map();

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    this.#events = [...this.#model.events
      .map((event) => this.#model.getEventDetails(event))];
    this.#events.sort(SortFns[this.#currentSortType]);
    this.#renderList();
  }

  #handleModeViewChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeViewChange: this.#handleModeViewChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderList() {
    if (this.#model.isEmpty()) {
      this.#renderEmptyList();
    } else {
      this.#renderContent();
    }
  }

  #clearList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      activeType: this.#currentSortType
    });
    render(this.#sortComponent, this.#eventsContainer);
  }

  #replaceSort() {
    if (this.#sortComponent) {
      const newSortComponent = new SortView({
        onSortTypeChange: this.#handleSortTypeChange,
        activeType: this.#currentSortType
      });
      replace(newSortComponent, this.#sortComponent);
      this.#sortComponent = newSortComponent;
    }
  }

  #renderListComponent() {
    render(this.#eventListComponent, this.#eventsContainer);
  }

  #renderContent() {
    this.#renderSort();
    this.#renderListComponent();
    this.#renderEvents();
  }

  #handleEventChange = (updateEvent) => {
    this.#events = updateItem(this.#events, updateEvent);
    this.#eventPresenters.get(updateEvent.id).init(updateEvent);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;

    this.#sortTasks(sortType);
    this.#clearList();
    this.#replaceSort();
    this.#renderEvents();
  };

  #sortTasks(sortType) {
    this.#events = [...this.#events].sort(SortFns[sortType]);
  }
}
