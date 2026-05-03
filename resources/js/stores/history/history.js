import {defineStore} from 'pinia';
import {Cache} from 'libs/Cache';
import {StorageKey} from 'config/storage';

/**
 * 喝過紀錄。每筆 = {id, drinkId, shopId, drankAt, rating(1~5), sweetness, ice, size, toppings, note}
 */
export const useHistoryStore = defineStore('history', {
    state: () => ({
        records: [],
    }),
    getters: {
        sortedRecords: (state) => [...state.records].sort((a, b) => b.drankAt - a.drankAt),
        recentDrinkIds: (state) => Array.from(new Set(
            [...state.records].sort((a, b) => b.drankAt - a.drankAt).map((r) => r.drinkId),
        )),
        countByDrinkId: (state) => state.records.reduce((acc, r) => {
            acc[r.drinkId] = (acc[r.drinkId] || 0) + 1;
            return acc;
        }, {}),
        countByShopId: (state) => state.records.reduce((acc, r) => {
            acc[r.shopId] = (acc[r.shopId] || 0) + 1;
            return acc;
        }, {}),
        averageRating: (state) => {
            const rated = state.records.filter((r) => Number.isFinite(r.rating));
            if (rated.length === 0) return 0;
            const total = rated.reduce((sum, r) => sum + r.rating, 0);
            return Math.round((total / rated.length) * 10) / 10;
        },
    },
    actions: {
        addRecord(record) {
            const id = `r-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
            const drankAt = record.drankAt ?? Date.now();
            this.records = [...this.records, {...record, id, drankAt}];
        },
        updateRecord(id, patch) {
            this.records = this.records.map((r) => (r.id === id ? {...r, ...patch} : r));
        },
        removeRecord(id) {
            this.records = this.records.filter((r) => r.id !== id);
        },
        restoreFromStorage() {
            const stored = Cache.localStorage.get(StorageKey.HISTORY);
            if (Array.isArray(stored)) this.records = stored;
        },
        persistToStorage() {
            Cache.localStorage.set(StorageKey.HISTORY, this.records);
        },
    },
});
