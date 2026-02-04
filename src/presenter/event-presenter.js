import { render, replace } from '../framework/render.js';;
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view/form-view/edit-form-view.js';
import { ESC_KEY } from '../constants/const.js';


export default class EventPresenter {
  #eventEditComponent = null;
  #eventComponent = null;
  #eventListComponent = null;

  constructor({ eventListComponent }) {
    this.#eventListComponent = eventListComponent;
  }

  init(pointData) {
    this.#eventEditComponent = new EditFormView({
      onSubmit: () => this.#handleFormSubmit(),
      onClose: () => this.#handleFormClose()
    });

    this.#eventComponent = new EventItemView(pointData, {
      onEdit: () => this.#handleEditClick()
    });

    render(this.#eventComponent, this.#eventListComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      replace(this.#eventComponent, this.#eventEditComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  }

  #handleFormSubmit(){
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormClose(){
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleEditClick(){
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

}
