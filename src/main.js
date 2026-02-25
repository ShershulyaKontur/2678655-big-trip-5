import MainPresenter from './presenter/main-presenter';
import FiltersPresenter from './presenter/filters-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter({
  eventsModel,
  filterModel,
  eventsContainer,
  headerContainer
});
const filtersPresenter = new FiltersPresenter({
  filterModel,
  eventsModel,
  filtersContainer
});

filtersPresenter.init();
mainPresenter.init();
