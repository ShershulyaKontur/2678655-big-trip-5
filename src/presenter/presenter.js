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
