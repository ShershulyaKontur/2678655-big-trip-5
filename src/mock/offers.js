import { EVENT_TYPE, OFFERS_MOCK } from "../const/const";
import { getRandomArrayElement, getRandomInteger } from "../utils/utils";

export const mockOffers = [
  {
    type: getRandomArrayElement(EVENT_TYPE),
    offer: [
      {
        id: 1,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPE),
    offer: [
      {
        id: 1,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPE),
    offer: [
      {
        id: 1,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPE),
    offer: [
      {
        id: 1,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 200),
      }
    ]
  },
  {
    type: getRandomArrayElement(EVENT_TYPE),
    offer: [
      {
        id: 1,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 2000),
      },
      {
        id: 2,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1500, 2000),
      },
      {
        id: 3,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(1000, 1500),
      },
      {
        id: 4,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 2000),
      },
      {
        id: 5,
        title: getRandomArrayElement(OFFERS_MOCK),
        price: getRandomInteger(100, 200),
      }
    ]
  }
];
