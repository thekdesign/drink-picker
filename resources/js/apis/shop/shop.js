import shopSeed from 'data/shops.json';
import {mockResponse} from 'apis/base';

export const getShopList = () => mockResponse(shopSeed);

export const getShopById = (id) => mockResponse(shopSeed.find((s) => s.id === id));
