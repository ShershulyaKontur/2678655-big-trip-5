import FiltersView from '../view/filters-view/filters-view.js';
import { render, remove, replace } from '../framework/render.js';
import { Filter, FilterType } from '../constants/filter-const.js';
import { UpdateType } from '../constants/const.js';

export default class FiltersPresenter {
  #filtersContainer = null;
  #filtersComponent = null;
  #filterModel = null;
  #eventsModel = null;

  constructor({ filtersContainer, filterModel, eventsModel }) {
    this.#filterModel = filterModel;
    this.#eventsModel = eventsModel;
    this.#filtersContainer = filtersContainer;

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const events = this.#eventsModel.events;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'Everything',
        count: Filter[FilterType.EVERYTHING](events).length
      },
      {
        type: FilterType.FUTURE,
        name: 'Future',
        count: Filter[FilterType.FUTURE](events).length
      },
      {
        type: FilterType.PRESENT,
        name: 'Present',
        count: Filter[FilterType.PRESENT](events).length
      },
      {
        type: FilterType.PAST,
        name: 'Past',
        count: Filter[FilterType.PAST](events).length
      }
    ];

  }

  init() {
    const filters = this.filters;
    const prevFilterComponent = this.#filtersComponent;

    this.#filtersComponent = new FiltersView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterChange,
    });

    if (prevFilterComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };

}
