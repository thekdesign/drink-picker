import {defineStore} from 'pinia';
import * as drinkApi from 'apis/drink/drink';

export const useDrinkStore = defineStore('drink', {
    state: () => ({
        list: [],
    }),
    getters: {
        listByShop: (state) => state.list.reduce((acc, d) => {
            (acc[d.shopId] = acc[d.shopId] || []).push(d);
            return acc;
        }, {}),
        getById: (state) => (id) => state.list.find((d) => d.id === id),
    },
    actions: {
        async requestGetDrinkList() {
            this.list = await drinkApi.getDrinkList();
        },
    },
});
