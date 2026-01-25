import Model from './model/model';
import Presenter from './presenter/presenter';

const model = new Model();
const presenter = new Presenter(model);
presenter.init();
