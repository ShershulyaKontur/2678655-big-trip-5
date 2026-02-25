import MainPresenter from './presenter/main-presenter';
import FiltersPresenter from './presenter/filters-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './service/events-api-service.js';

const AUTHORIZATION = 'Basic h31231231wsedasd';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');

const filterModel = new FilterModel();
const eventsModel = new EventsModel({
  eventsApiService : new EventsApiService(END_POINT, AUTHORIZATION)
});

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
