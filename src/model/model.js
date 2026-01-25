
import { getDestinations, getOffers, getPoints } from '../mock/mock-utils.js';


export default class Model {

  constructor() {
    this.points = getPoints();
    this.offers = getOffers();
    this.destinations = getDestinations();
  }

  getDestById(id){
    return this.destinations.find((el) => el.id === id) || null;
  }

  getOfferByType(type){
    return this.offers.find((el) => el.type === type) || [];
  }

}
