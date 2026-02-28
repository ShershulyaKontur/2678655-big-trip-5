import { ESC_KEY, UpdateType, UserAction } from '../constants/const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import CreateFormView from '../view/create-form-view/create-form-view.js';

export default class NewEventPresenter {
  #eventListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;
  #eventCreateView = null;
  #eventsModel = null;

  constructor({eventListContainer, onDataChange, onDestroy, eventsModel}) {
    this.#eventListContainer = eventListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
    this.#eventsModel = eventsModel;
  }

  init() {
    console.log(this.#eventListContainer)
    this.#eventCreateView = new CreateFormView({
      onSubmit: this.#handleFormSubmit,
      onClose: this.#handleCancelClick,
      allDestinations: this.#eventsModel.destinations,
      allOffers: this.#eventsModel.offers,
      offersTypes: this.#eventsModel.getOffersTypes(),
    });

    console.log("INIT")
    console.log(this.#eventCreateView)
    console.log(this.#eventListContainer)

    render(this.#eventCreateView, this.#eventListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventCreateView === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#eventCreateView);
    this.#eventCreateView = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    if (this.#eventCreateView) {
      this.#eventCreateView.updateElement({
        isDisable: true,
        isSaving: true,
        isDeleting: true
      });
    }
  }

  setAborting() {
    console.log('setAborting called', this.#eventCreateView);
    console.log('shake method exists:', typeof this.#eventCreateView.shake === 'function');
    const resetFormState = () => {
      this.#eventCreateView.updateElement({
        isDisable: false,
        isSaving: false,
        isDeleting: false
      });
    };
    try {
      this.#eventCreateView.shake(resetFormState);
      console.log('shake method called successfully');
    } catch (error) {
      console.error('Error calling shake:', error);
    }
  }

  #handleCancelClick = () => {
    this.destroy();
  };

  #handleFormSubmit = async (event) => {
    try {
      await this.#handleDataChange(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        event
      );
      this.destroy();
    } catch (error) {
      throw error;
    }
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
