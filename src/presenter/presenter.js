import EventList from "../view/event-list/event-list";
import Filters from "../view/filters/filters";
import EditForm from "../view/form/edit-form";
import CreateForm from "../view/form/create-form";
import EventItem from "../view/event-item/event-item";
import Sort from "../view/sort/sort";
import { render } from '../render.js';
import { MAX_ITEM_COUNT } from "../data.js";


export default class Presenter {
  EventListComponenet = new EventList();

  constructor() {
    this.tripcControlsFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');
  }

  init() {
    render(new Filters(), this.tripcControlsFilters);
    render(new Sort(), this.tripEvents);
    render(this.EventListComponenet, this.tripEvents);
    render(new EditForm(), this.EventListComponenet.getElement());

    for (let i = 0; i < MAX_ITEM_COUNT; i++) {
      render(new EventItem(), this.EventListComponenet.getElement());
    }
    render(new CreateForm(), this.EventListComponenet.getElement());
  }

}
