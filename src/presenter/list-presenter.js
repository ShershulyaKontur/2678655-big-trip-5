import { render, replace, remove } from '../framework/render.js';
import { SortType } from '../constants/sort-const.js';
import { SortFns } from '../constants/sort-const.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';
import EventPresenter from './event-presenter.js';
import { Filter, FilterType } from '../constants/filter-const.js';
import { UpdateType, UserAction } from '../constants/const.js';
import NewEventPresenter from './new-event-presenter.js';
import LoadingView from '../view/loading-view/loading-view.js';

export default class ListPresenter {
  #container = null;
  #eventsModel = null;
  #filterModel = null;
  #sortComponent = null;
  #emptyListComponent = null;
  #newEventPresenter = null;
  #onNewEventDestroy = null;

  #eventPresenters = new Map();
  #eventListComponent = new EventListView();
  #loadingComponent = new LoadingView();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;

  constructor({ container, eventsModel, filterModel, onNewEventDestroy}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#onNewEventDestroy = onNewEventDestroy;
    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }


  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filterFunction = Filter[this.#filterType];

    return filterFunction(events).sort(SortFns[this.#currentSortType]);
  }

  init() {
    this.#render();
  }

  createEvent() {
    if (!this.#eventListComponent.element) {
      this.#renderEventListComponent();
    }

    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#onNewEventDestroy,
      eventsModel: this.#eventsModel,
    });

    this.#newEventPresenter.init();
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

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyList({filterType: this.#filterType});
    render(this.#emptyListComponent, this.#container);
    remove(this.#loadingComponent);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #render() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.events.length === 0) {
      this.#renderEmptyList();
      return;
    }

    this.#renderSort();
    this.#renderEventListComponent();
    this.#renderEvents();
  }

  #clearList({resetSortType = false} = {}) {
    this.#clearEvents();

    remove(this.#emptyListComponent);
    remove(this.#eventListComponent);
    remove(this.#sortComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
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
    if (this.#newEventPresenter) {
      this.#newEventPresenter.destroy();
      this.#newEventPresenter = null;
    }
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
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
