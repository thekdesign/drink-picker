import {defineStore} from 'pinia';
import * as shopApi from 'apis/shop/shop';

export const useShopStore = defineStore('shop', {
    state: () => ({
        list: [],
    }),
    getters: {
        getById: (state) => (id) => state.list.find((s) => s.id === id),
    },
    actions: {
        async requestGetShopList() {
            this.list = await shopApi.getShopList();
        },
    },
});
