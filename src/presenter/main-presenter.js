import ListPresenter from './list-presenter.js';

export default class MainPresenter {
  #model = null;
  #eventsContainer = null;
  #listPresenter = null;

  constructor({ model, eventsContainer }) {
    this.#model = model;
    this.#eventsContainer = eventsContainer;
  }

  init() {
    const events = this.#model.events.map((event) =>
      this.#model.getEventDetails(event)
    );
    this.#listPresenter = new ListPresenter({
      container: this.#eventsContainer,
      model: this.#model
    });
    this.#listPresenter.init(events);
  }

}
