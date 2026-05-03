import {defineStore} from 'pinia';
import {Cache} from 'libs/Cache';
import {StorageKey} from 'config/storage';

export const useFavoriteStore = defineStore('favorite', {
    state: () => ({
        favoriteIds: [],   // 飲料 id 清單
        blocklist: [],     // 不要再推薦的 drink id
    }),
    getters: {
        isFavorited: (state) => (drinkId) => state.favoriteIds.includes(drinkId),
        isBlocked: (state) => (drinkId) => state.blocklist.includes(drinkId),
        favoriteCount: (state) => state.favoriteIds.length,
    },
    actions: {
        toggleFavorite(drinkId) {
            const exists = this.favoriteIds.includes(drinkId);
            this.favoriteIds = exists
                ? this.favoriteIds.filter((id) => id !== drinkId)
                : [...this.favoriteIds, drinkId];
        },
        toggleBlock(drinkId) {
            const exists = this.blocklist.includes(drinkId);
            this.blocklist = exists
                ? this.blocklist.filter((id) => id !== drinkId)
                : [...this.blocklist, drinkId];
        },
        updateFavorites(ids) {
            this.favoriteIds = ids;
        },
        restoreFromStorage() {
            const stored = Cache.localStorage.get(StorageKey.FAVORITES);
            const blocked = Cache.localStorage.get(StorageKey.BLOCKLIST);
            if (Array.isArray(stored)) this.favoriteIds = stored;
            if (Array.isArray(blocked)) this.blocklist = blocked;
        },
        persistToStorage() {
            Cache.localStorage.set(StorageKey.FAVORITES, this.favoriteIds);
            Cache.localStorage.set(StorageKey.BLOCKLIST, this.blocklist);
        },
    },
});
