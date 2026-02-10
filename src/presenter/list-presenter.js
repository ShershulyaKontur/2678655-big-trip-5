import { render, replace } from '../framework/render.js';
import { updateItem } from '../utils/utils.js';
import { SortType } from '../constants/sort-const.js';
import { SortFns } from '../constants/sort-const.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class ListPresenter {
  #container = null;
  #sortComponent = null;

  #events = [];
  #sourcedEvents = [];

  #eventPresenters = new Map();
  #eventListComponent = new EventListView();
  #emptyListComponent = new EmptyList();
  #currentSortType = SortType.DAY;

  constructor({ container }) {
    this.#container = container;
  }

  init(events) {
    this.#events = [...events];
    this.#sourcedEvents = [...this.#events];
    this.#events.sort(SortFns[this.#currentSortType]);
    this.#render();
  }

  #renderContent() {
    this.#renderSort();
    this.#renderEventListComponent();
    this.#renderEvents();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange,
      activeType: this.#currentSortType
    });
    render(this.#sortComponent, this.#container);
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

  #renderEventListComponent() {
    render(this.#eventListComponent, this.#container);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleEventChange,
      onModeViewChange: this.#handleModeViewChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    this.#events.forEach((event) => this.#renderEvent(event));
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#container);
  }

  #render() {
    if (this.#events.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderContent();
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #sortTasks(sortType) {
    this.#events = [...this.#sourcedEvents].sort(SortFns[sortType]);
  }

  setSortType(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#sortTasks(sortType);
    this.#replaceSort();
    this.#clearEventList();
    this.#renderEvents();
  }

  #handleSortTypeChange = (sortType) => {
    this.setSortType(sortType);
  };

  #handleEventChange = (updateEvent) => {
    this.#events = updateItem(this.#events, updateEvent);
    this.#eventPresenters.get(updateEvent.id).init(updateEvent);
  };

  #handleModeViewChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
