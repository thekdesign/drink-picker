import {storeToRefs} from 'pinia';
import {useDrinkStore} from 'stores/drink/drink';
import {useFavoriteStore} from 'stores/favorite/favorite';
import {usePickerStore} from 'stores/picker/picker';
import {buildPickerCandidatePool} from 'formatters/drink/Picker';
import {pickRandom} from 'libs/random';

const SPIN_DURATION_MS = 800;

export const useRandomPick = () => {
    const drinkStore = useDrinkStore();
    const favoriteStore = useFavoriteStore();
    const pickerStore = usePickerStore();

    const {list} = storeToRefs(drinkStore);
    const {blocklist} = storeToRefs(favoriteStore);

    const drawCandidates = async (count = 3) => {
        pickerStore.updateSpinning(true);
        pickerStore.updateCandidates([]);

        const pool = buildPickerCandidatePool(list.value, {
            moodKey: pickerStore.moodKey,
            priceMax: pickerStore.priceMax,
            blocklist: blocklist.value,
        });
        const picks = pickRandom(pool, count);

        await new Promise((resolve) => setTimeout(resolve, SPIN_DURATION_MS));
        pickerStore.updateCandidates(picks);
        pickerStore.updateSpinning(false);
        return picks;
    };

    return {drawCandidates};
};
