import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view/form-view/edit-form-view.js';
import { ESC_KEY } from '../constants/const.js';

export default class PointPresenter {
  #eventEditForm = null;
  #eventComponent = null;
  #eventListComponent = null;
  #handleEventChange = null;
  #pointData = null;

  constructor({ eventListComponent, onDataChange }) {
    this.#eventListComponent = eventListComponent;
    this.#handleEventChange = onDataChange;
  }

  init(pointData) {
    this.#pointData = pointData;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditForm = this.#eventEditForm;

    this.#eventEditForm = new EditFormView({
      onSubmit: () => this.#handleFormSubmit(),
      onClose: () => this.#handleFormClose()
    });

    this.#eventComponent = new EventItemView({
      pointData,
      onFavorite: () => this.#handleFavoriteClick(),
      onEdit: () => this.#handleEditClick()
    });

    if(prevEventComponent === null || prevEventEditForm === null){
      render(this.#eventComponent, this.#eventListComponent);
      return;
    }

    if(this.#eventListComponent.contains(prevEventComponent.element)){
      replace(this.#eventComponent, prevEventComponent);
    }

    if(this.#eventListComponent.contains(prevEventEditForm.element)){
      replace(this.#eventEditForm, prevEventEditForm);
    }

    remove(prevEventComponent);
    remove(prevEventEditForm);
  }


  #handleFavoriteClick(){
    this.#handleEventChange({
      ...this.#pointData,
      isFavorite: !this.#pointData.isFavorite
    });
  }

  #replaceEventToForm(){
    replace(this.#eventComponent, this.#eventEditForm);
  }

  #replaceFormToEvent(){
    replace(this.#eventEditForm, this.#eventComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      replace(this.#eventComponent, this.#eventEditForm);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFormSubmit(){
    this.#replaceEventToForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormClose(){
    this.#replaceEventToForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick(){
    this.#replaceFormToEvent();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }
}
