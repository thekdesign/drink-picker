import drinkSeed from 'data/drinks.json';
import {mockResponse} from 'apis/base';

export const getDrinkList = () => mockResponse(drinkSeed);

export const getDrinkById = (id) => mockResponse(drinkSeed.find((d) => d.id === id));
