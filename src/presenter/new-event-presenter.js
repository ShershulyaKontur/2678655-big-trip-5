import { ESC_KEY, UpdateType, UserAction } from '../constants/const.js';
import { remove, render, RenderPosition } from '../framework/render.js';
import { nanoid } from 'nanoid';
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
    if (this.#eventCreateView !== null) {
      return;
    }

    this.#eventCreateView = new CreateFormView({
      onSubmit: this.#handleFormSubmit,
      onClose: this.#handleCancelClick,
      allDestinations: this.#eventsModel.destinations,
      allOffers: this.#eventsModel.offers,
      offersTypes: this.#eventsModel.getOffersTypes(),
    });

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

  #handleCancelClick = () => {
    this.destroy();
  };

  #handleFormSubmit = (event) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      {id: nanoid(), ...event},
    );
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
