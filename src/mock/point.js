import { EVENT_TYPE, OFFERS_MOCK } from "../const/const";
import { getRandomArrayElement, getRandomInteger } from "../utils/utils";

const mockPoint = [
  {
    id: 1,
    basePrice:getRandomInteger(100, 1000),
    dateFrom: '2026-01-14T20:18:12.653Z',
    dateTo: '2026-01-14T20:18:12.653Z',
    destination: 1,
    isFavorite: true,
    offers: [getRandomArrayElement(OFFERS_MOCK), getRandomArrayElement(OFFERS_MOCK)],
    type: getRandomArrayElement(EVENT_TYPE),
  },
  {
    id: 2,
    basePrice:getRandomInteger(100, 1000),
    dateFrom: '2026-01-14T20:18:12.653Z',
    dateTo: '2026-01-14T20:18:12.653Z',
    destination: 2,
    isFavorite: false,
    offers: [getRandomArrayElement(OFFERS_MOCK), getRandomArrayElement(OFFERS_MOCK)],
    type: getRandomArrayElement(EVENT_TYPE),
  },
  {
    id: 3,
    basePrice:getRandomInteger(100, 1000),
    dateFrom: '2026-01-14T20:18:12.653Z',
    dateTo: '2026-01-14T20:18:12.653Z',
    destination: 3,
    isFavorite: true,
    offers: [getRandomArrayElement(OFFERS_MOCK), getRandomArrayElement(OFFERS_MOCK)],
    type: getRandomArrayElement(EVENT_TYPE),
  },
  {
    id: 4,
    basePrice:getRandomInteger(100, 1000),
    dateFrom: '2026-01-14T20:18:12.653Z',
    dateTo: '2026-01-14T20:18:12.653Z',
    destination: 4,
    isFavorite: true,
    offers: [getRandomArrayElement(OFFERS_MOCK), getRandomArrayElement(OFFERS_MOCK)],
    type: getRandomArrayElement(EVENT_TYPE),
  },
  {
    id: 5,
    basePrice:getRandomInteger(100, 1000),
    dateFrom: '2026-01-14T20:18:12.653Z',
    dateTo: '2026-01-14T20:18:12.653Z',
    destination: 5,
    isFavorite: false,
    offers: [getRandomArrayElement(OFFERS_MOCK), getRandomArrayElement(OFFERS_MOCK)],
    type: getRandomArrayElement(EVENT_TYPE),
  }
];

export const getRandomPoint = () => getRandomArrayElement(mockPoint);
