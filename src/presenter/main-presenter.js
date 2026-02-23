import NewEventButtonView from '../view/new-event-button-view/new-event-button-view.js';
import ListPresenter from './list-presenter.js';
import { render } from '../framework/render.js';

export default class MainPresenter {
  #eventsModel = null;
  #filterModel = null;
  #eventsContainer = null;
  #headerContainer = null;
  #listPresenter = null;
  #newEventButtonComponent = null;

  constructor({ eventsModel, eventsContainer, headerContainer,  filterModel }) {
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventsContainer = eventsContainer;
    this.#headerContainer = headerContainer;
  }

  init() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewEventButtonClick
    })

    this.#listPresenter = new ListPresenter({
      container: this.#eventsContainer,
      eventsModel: this.#eventsModel,
      filterModel: this.#filterModel,
      onNewEventDestroy: this.#handleNewEventFormClose
    });

    render(this.#newEventButtonComponent, this.#headerContainer);
    this.#listPresenter.init();
  }

  #handleNewEventFormClose = () => {
    this.#newEventButtonComponent.element.disabled = false;
  }

  #handleNewEventButtonClick = () => {
    this.#listPresenter.createEvent();
    this.#newEventButtonComponent.element.disabled = true;
  }

}
