import {useFavoriteStore} from 'stores/favorite/favorite';
import {useHistoryStore} from 'stores/history/history';

export const prepareUserPreference = async () => {
    const favoriteStore = useFavoriteStore();
    const historyStore = useHistoryStore();

    favoriteStore.restoreFromStorage();
    historyStore.restoreFromStorage();
};
