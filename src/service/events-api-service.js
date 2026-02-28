import { Method } from '../constants/const.js';
import ApiService from '../framework/api-service.js';


export default class EventsApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(event){
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }


  #adaptToServer(event) {
    const adaptedTask = {...event,
      'base_price': event.basePrice,
      'is_favorite': event.isFavorite,
      'date_to': event.dateTo,
      'date_from': event.dateFrom,
    };

    delete adaptedTask['basePrice'];
    delete adaptedTask['isFavorite'];
    delete adaptedTask['dateTo'];
    delete adaptedTask['dateFrom'];

    return adaptedTask;
  }
}
