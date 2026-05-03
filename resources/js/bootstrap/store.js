import {useFavoriteStore} from 'stores/favorite/favorite';
import {useHistoryStore} from 'stores/history/history';

export const prepareStoreSubscription = async () => {
    const favoriteStore = useFavoriteStore();
    const historyStore = useHistoryStore();

    favoriteStore.$subscribe(() => favoriteStore.persistToStorage());
    historyStore.$subscribe(() => historyStore.persistToStorage());
};
