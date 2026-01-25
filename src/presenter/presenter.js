import EventList from '../view/event-list/event-list';
import Filters from '../view/filters/filters';
import EditForm from '../view/form/edit-form';
import CreateForm from '../view/form/create-form';
import EventItem from '../view/event-item/event-item';
import Sort from '../view/sort/sort';
import { render } from '../render.js';
import { MAX_EVENT_COUNT } from '../const/const.js';


export default class Presenter {

  constructor() {
    this.filters = new new Filters();
    this.sort = new Sort();
    this.editForm = new EditForm();
    this.createForm = new CreateForm();
    this.eventListComponent = new EventList();
  }

  init() {
    this.tripcControlsFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');

    render(this.filters, tripcControlsFilters);
    render(this.sort, tripEvents);
    render(this.eventListComponent, tripEvents);
    render(this.createForm, eventListComponent.getElement());

    for (let i = 0; i < MAX_EVENT_COUNT; i++) {
      render(new EventItem(), this.eventListComponent.getElement());
    }
    render(new CreateForm(), this.eventListComponent.getElement());
  }

}
