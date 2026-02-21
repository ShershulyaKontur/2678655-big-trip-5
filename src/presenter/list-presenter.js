import { render, replace } from '../framework/render.js';
import { SortType } from '../constants/sort-const.js';
import { SortFns } from '../constants/sort-const.js';
import { UpdateType, UserAction } from '../constants/const.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class ListPresenter {
  #container = null;
  #sortComponent = null;
  #model = null;

  #eventPresenters = new Map();
  #eventListComponent = new EventListView();
  #emptyListComponent = new EmptyList();
  #currentSortType = SortType.DAY;

  constructor({ container, model }) {
    this.#container = container;
    this.#model = model;

    this.#model.addObserver(this.#handleModelEvent);
  }

  get events() {
    return [...this.#model.fullEvents].sort(SortFns[this.#currentSortType]);
  }

  init() {
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
      model: this.#model,
      eventListComponent: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeViewChange: this.#handleModeViewChange
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #renderEvents() {
    this.events.forEach((event) => this.#renderEvent(event));
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#container);
  }

  #render() {
    if (this.events.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderContent();
  }

  #clearEventList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  setSortType(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#replaceSort();
    this.#clearEventList();
    this.#renderEvents();
  }

  #handleSortTypeChange = (sortType) => {
    this.setSortType(sortType);
  };

  #handleModeViewChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.MINOR:
        this.#eventPresenters.get(data.id).init(data);
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType){
      case UserAction.UPDATE_EVENT:
        this.#model.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#model.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#model.deleteEvent(updateType, update);
        break;
    }
  };

}
