import FiltersPresenter from './presenter/filters-presenter.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import EventsApiService from './service/events-api-service.js';
import ListPresenter from './presenter/list-presenter.js';
import NewEventButtonView from './view/new-event-button-view/new-event-button-view.js';
import { render } from './framework/render.js';

const AUTHORIZATION = 'Basic h31231231wsedasd';
const END_POINT = 'https://24.objects.htmlacademy.pro/big-trip';

const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');
const headerContainer = document.querySelector('.trip-main');
const filterModel = new FilterModel();

const eventsModel = new EventsModel({
  eventsApiService : new EventsApiService(END_POINT, AUTHORIZATION)
});

const filtersPresenter = new FiltersPresenter({
  filterModel,
  eventsModel,
  filtersContainer
});

const newTaskButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

const listPresenter = new ListPresenter({
  container: eventsContainer,
  eventsModel:eventsModel,
  filterModel: filterModel,
  onNewEventDestroy: handleNewEventFormClose
});


function handleNewEventFormClose(){
  newTaskButtonComponent.element.disabled = false;
};

function handleNewEventButtonClick(){
  listPresenter.createEvent();
  newTaskButtonComponent.element.disabled = true;
};

listPresenter.init();
filtersPresenter.init();
eventsModel.init()
  .finally(() => {
    render(newTaskButtonComponent, headerContainer);
  });;
