import { Method } from '../constants/const.js';
import ApiService from '../framework/api-service.js';


export default class EventApiService extends ApiService {
  get events() {
    return this._load({url: 'events'})
      .then(ApiService.parseResponse);
  }

  async updateTask(event) {
    const response = await this._load({
      url: `events/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(task),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
}
