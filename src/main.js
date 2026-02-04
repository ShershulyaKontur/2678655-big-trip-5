import { render } from './framework/render';
import { generateFilters } from './mock/filters';
import Model from './model/model';
import EventPresenter from './presenter/event-presenter';
import FiltersView from './view/filters-view/filters-view';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const model = new Model();
const filterData = generateFilters(model.points);
const filterComponent = new FiltersView(filterData);
const eventPresenter = new EventPresenter({
  model,
  eventsContainer
});

render(filterComponent, filtersContainer);
eventPresenter.init();
