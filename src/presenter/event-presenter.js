import { render, replace, remove } from '../framework/render.js';
import EventItemView from '../view/event-item-view/event-item-view.js';
import EditFormView from '../view//edit-form-view/edit-form-view.js';
import { ESC_KEY, Mode, UpdateType, UserAction } from '../constants/const.js';
import { isDatesEqual } from '../utils/utils.js';

export default class EventPresenter {
  #eventEditForm = null;
  #eventComponent = null;
  #eventListComponent = null;
  #eventsModel = null;
  #handleEventChange = null;
  #handleModeViewChange = null;

  #event = null;
  #modeView = Mode.DEFAULT;

  constructor({ eventListComponent, onDataChange, onModeViewChange, eventsModel }) {
    this.#eventListComponent = eventListComponent;
    this.#handleEventChange = onDataChange;
    this.#handleModeViewChange = onModeViewChange;
    this.#eventsModel = eventsModel;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditForm = this.#eventEditForm;

    this.#eventEditForm = new EditFormView({
      event,
      onSubmit: (updatedEvent) => this.#handleFormSubmit(updatedEvent),
      onClose: () => this.#handleFormClose(),
      onDelete: () => this.#handleDeleteClick(event),
      allDestinations: this.#eventsModel.destinations,
      allOffers: this.#eventsModel.offers,
      destinationById: this.#eventsModel.getDestinationById(event.destination),
      offersByType: this.#eventsModel.getOfferByType(event.type),
      offersTypes: this.#eventsModel.getOffersTypes(),
    });

    this.#eventComponent = new EventItemView({
      event,
      destination: this.#eventsModel.getDestinationById(event.destination),
      offers: this.#eventsModel.getOfferByType(event.type),
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
    this.#handleEventChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#event
        , isFavorite: !this.#event.isFavorite}
    );
  }

  #handleDeleteClick(event) {
    this.#handleEventChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event
    );
  }


  #handleFormSubmit(update) {
    const isMinorUpdate =
      !isDatesEqual(this.#event.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#event.dateTo, update.dateTo) ||
      this.#event.basePrice !== update.basePrice ||
      this.#event.destination !== update.destination ||
      this.#event.type !== update.type;

    this.#handleEventChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToEvent();
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === ESC_KEY) {
      evt.preventDefault();
      this.#eventEditForm.reset();
      this.#replaceFormToEvent();
    }
  };

  #handleFormClose() {
    this.#eventEditForm.reset();
    this.#replaceFormToEvent();
  }

  #handleEditClick() {
    this.#replaceEventToForm();
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

}
