import {defineStore} from 'pinia';

const initialFilter = () => ({
    keyword: '',
    shopIds: [],          // 篩選的店家
    tags: [],             // 飲料 tag
    caffeineLevels: [],   // Caffeine.key 多選
    priceMax: undefined,  // 上限（M 杯）
    excludeBlocked: true, // 過濾封鎖清單
});

export const useFilterStore = defineStore('filter', {
    state: () => ({
        ...initialFilter(),
    }),
    actions: {
        updateKeyword(keyword) {
            this.keyword = keyword;
        },
        updateShopIds(ids) {
            this.shopIds = ids;
        },
        updateTags(tags) {
            this.tags = tags;
        },
        updateCaffeineLevels(levels) {
            this.caffeineLevels = levels;
        },
        updatePriceMax(price) {
            this.priceMax = price;
        },
        updateExcludeBlocked(value) {
            this.excludeBlocked = value;
        },
        resetFilter() {
            const fresh = initialFilter();
            this.$patch(fresh);
        },
    },
});
