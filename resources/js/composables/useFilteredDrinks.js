import {computed} from 'vue';
import {storeToRefs} from 'pinia';
import {useDrinkStore} from 'stores/drink/drink';
import {useFilterStore} from 'stores/filter/filter';
import {useFavoriteStore} from 'stores/favorite/favorite';
import {filterDrinkList} from 'formatters/drink/Filter';

export const useFilteredDrinks = () => {
    const drinkStore = useDrinkStore();
    const filterStore = useFilterStore();
    const favoriteStore = useFavoriteStore();

    const {list} = storeToRefs(drinkStore);
    const {blocklist} = storeToRefs(favoriteStore);

    const filtered = computed(() => filterDrinkList(list.value, filterStore.$state, {
        blocklist: blocklist.value,
    }));

    return {filtered};
};
