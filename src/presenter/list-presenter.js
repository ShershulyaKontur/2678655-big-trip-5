import { render, replace, remove } from '../framework/render.js';
import { SortType } from '../constants/sort-const.js';
import { SortFns } from '../constants/sort-const.js';
import { UpdateType, UserAction } from '../constants/const.js';
import { Filter } from '../constants/filter-const.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';

export default class ListPresenter {
  #container = null;
  #eventsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #eventListComponent = null;
  #emptyListComponent = null;

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ container, eventsModel, filterModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventsModel.fullEvents;
    const filteredEvents = Filter[filterType](events);

    return [...filteredEvents].sort(SortFns[this.#currentSortType]);
  }


  init() {
    this.#render();
  }

  #render() {
    if (this.events.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderEventListComponent();
    this.#renderEvents();
  }

  #clearList({ resetSortType = false } = {}) {
    this.#clearEvents();

    remove(this.#emptyListComponent);
    remove(this.#eventListComponent);
    remove(this.#sortComponent);
    this.#sortComponent = null;

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
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
    this.#eventListComponent = new EventListView();
    render(this.#eventListComponent, this.#container);
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      eventsModel: this.#eventsModel,
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

  #clearEvents(){
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyList();
    render(this.#emptyListComponent, this.#container);
  }

  setSortType(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#replaceSort();
    this.#clearEvents();
    this.#renderEvents();
  }

  #handleSortTypeChange = (sortType) => {
    this.setSortType(sortType);
  };

  #handleModeViewChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearList();
        this.#render();
        break;
      case UpdateType.MAJOR:
        this.#clearList({resetSortType: true});
        this.#render();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };
}
