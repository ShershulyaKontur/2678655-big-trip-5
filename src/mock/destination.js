import { DESCRIPTIONS_MOCK } from "../const/const";
import { getRandomArrayElement, getRandomInteger } from "../utils/utils";

export const mockDestination = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS_MOCK),
    name: getRandomArrayElement(DESCRIPTIONS_MOCK),
    pictures: [
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      }
    ]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS_MOCK),
    name: getRandomArrayElement(DESCRIPTIONS_MOCK),
    pictures: [
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      }
    ]
  },
  {
    id: 3,
    description: getRandomArrayElement(DESCRIPTIONS_MOCK),
    name: getRandomArrayElement(DESCRIPTIONS_MOCK),
    pictures: [
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      }
    ]
  },
  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTIONS_MOCK),
    name: getRandomArrayElement(DESCRIPTIONS_MOCK),
    pictures: [
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      }
    ]
  },
  {
    id: 5,
    description: getRandomArrayElement(DESCRIPTIONS_MOCK),
    name: getRandomArrayElement(DESCRIPTIONS_MOCK),
    pictures: [
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      },
      {
        src: `https://24.objects.htmlacademy.pro/static/destinations/${getRandomInteger()}.jpg`,
        description: getRandomArrayElement(DESCRIPTIONS_MOCK)
      }
    ]
  }
];
