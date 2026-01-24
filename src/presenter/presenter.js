import EventList from '../view/event-list/event-list';
import Filters from '../view/filters/filters';
import EditForm from '../view/form/edit-form';
import CreateForm from '../view/form/create-form';
import EventItem from '../view/event-item/event-item';
import Sort from '../view/sort/sort';
import { render } from '../render.js';
import { MAX_EVENT_COUNT } from '../const/const.js';


export default class Presenter {
  eventListComponent = new EventList();

  constructor() {
    this.filtersContainer = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');
  }

  init() {
    render(new Filters(), this.filtersContainer);
    render(new Sort(), this.tripEvents);
    render(this.eventListComponent, this.tripEvents);
    render(new EditForm(), this.eventListComponent.getElement());

    for (let i = 0; i < MAX_EVENT_COUNT; i++) {
      render(new EventItem(), this.eventListComponent.getElement());
    }
    render(new CreateForm(), this.eventListComponent.getElement());
  }

}
