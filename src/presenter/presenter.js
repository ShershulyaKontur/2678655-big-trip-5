import EventList from '../view/event-list/event-list';
import Filters from '../view/filters/filters';
import EditForm from '../view/form/edit-form';
import CreateForm from '../view/form/create-form';
import EventItem from '../view/event-item/event-item';
import Sort from '../view/sort/sort';
import { render } from '../render.js';

export default class Presenter {

  constructor(model) {
    this.model = model;
    this.filters = new Filters();
    this.sort = new Sort();
    this.editForm = new EditForm();
    this.createForm = new CreateForm();
    this.eventListComponent = new EventList();
  }


  init() {
    this.tripControlsFilters = document.querySelector('.trip-controls__filters');
    this.tripEvents = document.querySelector('.trip-events');

    render(this.filters, this.tripControlsFilters);
    render(this.sort, this.tripEvents);
    render(this.eventListComponent, this.tripEvents);


    const listElement = this.eventListComponent.getElement();
    render(this.createForm, listElement);
    render(this.editForm, listElement);


    this.model.points.forEach((point) => {
      const destination = this.model.getDestById(point.destination);
      const typeOffers = this.model.getOfferByType(point.type);
      const offers = typeOffers.offers.filter((offer) => point.offers.includes(offer.id)) || [];
      const eventItem = new EventItem(point, offers, destination);
      render(eventItem, listElement);
    });
  }
}
