import { render, replace } from '../framework/render.js';
import SortView from '../view/sort-view/sort-view.js';
import EventListView from '../view/event-list-view/event-list-view.js';
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view/form-view/edit-form-view.js';
import { ESC_KEY } from '../constants/const.js';
import EmptyList from '../view/list-empty-view/list-empty-view.js';

export default class EventPresenter {
  #model = null;
  #eventsContainer = null;
  #sortComponent = null;
  #eventListComponent = null;
  #emptyListComponent = null;

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  #renderEvent(point) {
    const eventData = this.#model.getEventDetails(point);

    const editForm = new EditFormView({
      onSubmit: () => handleFormSubmit(),
      onClose: () => handleFormClose()
    });

    const eventItem = new EventItemView(eventData, {
      onEdit: () => handleEditClick()
    });

    function escKeyDownHandler(evt){
      if (evt.key === ESC_KEY) {
        evt.preventDefault();
        replace(eventItem, editForm);
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }
    function handleFormSubmit(){
      replace(eventItem, editForm);
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    function handleFormClose(){
      replace(eventItem, editForm);
      document.removeEventListener('keydown', escKeyDownHandler);
    }
    function handleEditClick(){
      replace(editForm, eventItem);
      document.addEventListener('keydown', escKeyDownHandler);
    }

    render(eventItem, this.#eventListComponent.element);
  }

  #renderEmptyList() {
    this.#emptyListComponent = new EmptyList();
    render(this.#emptyListComponent, this.#eventsContainer);
  }

  #renderContent() {
    this.#sortComponent = new SortView();
    this.#eventListComponent = new EventListView();

    render(this.#sortComponent, this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);
    this.renderEvents();
  }

  renderEvents() {
    this.#model.points.forEach((point) => this.#renderEvent(point));
  }

  init() {
    if (this.#model.isEmpty()) {
      this.#renderEmptyList();
    } else {
      this.#renderContent();
    }
  }
}
