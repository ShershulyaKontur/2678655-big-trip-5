import { mockOffers } from './offers.js';
import { mockDestinations } from './destinations.js';
import { mockEvents } from './point.js';

export const getOffers = () => [...mockOffers];
export const getDestinations = () => [...mockDestinations];
export const getPoints = () => [...mockEvents];
