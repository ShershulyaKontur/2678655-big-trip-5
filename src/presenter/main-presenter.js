import ListPresenter from './list-presenter.js';

export default class MainPresenter {
  #eventsModel = null;
  #filterModel = null;
  #eventsContainer = null;
  #listPresenter = null;

  constructor({ eventsModel, eventsContainer, filterModel }) {
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    this.#listPresenter = new ListPresenter({
      container: this.#eventsContainer,
      eventsModel: this.#eventsModel,
      filterModel: this.#filterModel,
    });
    this.#listPresenter.init();
  }

}
