import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import FiltersPresenter from './presenter/filters-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const eventsModel = new EventsModel();
const filterModel = new FilterModel(eventsModel.events);

const mainPresenter = new MainPresenter({
  filterModel,
  eventsModel,
  eventsContainer
});
const filtersPresenter = new FiltersPresenter({
  filterModel,
  eventsModel,
  filtersContainer
});

filtersPresenter.init();
mainPresenter.init();
