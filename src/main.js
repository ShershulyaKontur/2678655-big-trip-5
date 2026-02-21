import { generateFilters } from './mock/filters.js';
import Model from './model/model.js';
import FiltersPresenter from './presenter/filter-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const model = new Model();
const filterData = generateFilters(model.events);
const mainPresenter = new MainPresenter({
  model,
  eventsContainer
});
const filtersPresenter = new FiltersPresenter({
  filterData,
  filtersContainer
});

filtersPresenter.init();
mainPresenter.init();
