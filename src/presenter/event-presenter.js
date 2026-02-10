import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view/form-view/edit-form-view.js';
import { ESC_KEY, Mode } from '../constants/const.js';

export default class EventPresenter {
  #eventEditForm = null;
  #eventComponent = null;
  #eventListComponent = null;

  #handleEventChange = null;
  #handleModeViewChange = null;

  #eventData = null;
  #modeView = Mode.DEFAULT;

  constructor({ eventListComponent, onDataChange, onModeViewChange }) {
    this.#eventListComponent = eventListComponent;
    this.#handleEventChange = onDataChange;
    this.#handleModeViewChange = onModeViewChange;
  }

  init(eventData) {
    this.#eventData = eventData;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditForm = this.#eventEditForm;

    this.#eventEditForm = new EditFormView({
      onSubmit: () => this.#handleFormSubmit(),
      onClose: () => this.#handleFormClose()
    });

    this.#eventComponent = new EventItemView({
      eventData,
      onFavorite: () => this.#handleFavoriteClick(),
      onEdit: () => this.#handleEditClick()
    });

    const replaceEventElements = {
      [Mode.DEFAULT]: () => {
        replace(this.#eventComponent, prevEventComponent);
        remove(prevEventEditForm);
      },
      [Mode.EDITING]: () => {
        replace(this.#eventEditForm, prevEventEditForm);
        remove(prevEventComponent);
      }
    };

    if (prevEventComponent === null || prevEventEditForm === null) {
      render(this.#eventComponent, this.#eventListComponent);
      return;
    }

    replaceEventElements[this.#modeView]();
  }

  destroy(){
    remove(this.#eventComponent);
    remove(this.#eventEditForm);
  }

  resetView() {
    if (this.#modeView !== Mode.DEFAULT) {
      this.#replaceFormToEvent();
    }
  }

  #handleFavoriteClick() {
    this.#handleEventChange({
      ...this.#eventData,
      isFavorite: !this.#eventData.isFavorite
    });
  }

  #replaceEventToForm() {
    replace(this.#eventEditForm, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeViewChange();
    this.#modeView = Mode.EDITING;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditForm);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#modeView = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      this.#replaceFormToEvent();
    }
  };

  #handleFormSubmit() {
    this.#replaceFormToEvent();
  }

  #handleFormClose() {
    this.#replaceFormToEvent();
  }

  #handleEditClick() {
    this.#replaceEventToForm();
  }
}
