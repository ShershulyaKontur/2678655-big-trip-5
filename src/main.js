import Model from './model/model';
import Presenter from './presenter/presenter';

const model = new Model();
const filtersContainer = document.querySelector('.trip-controls__filters');
const eventsContainer = document.querySelector('.trip-events');

const presenter = new Presenter({
  model,
  filtersContainer,
  eventsContainer
});

presenter.init();
