import {moodMap} from 'maps/drink/Mood';

/**
 * 依心情 + 預算挑出候選池。
 */
export const buildPickerCandidatePool = (drinks, {moodKey, priceMax, blocklist = []} = {}) => {
    const moodEntry = moodKey ? moodMap.get(moodKey) : undefined;
    return drinks.filter((d) => {
        if (blocklist.includes(d.id)) return false;
        if (Number.isFinite(priceMax) && d.priceM > priceMax) return false;
        if (moodEntry && !moodEntry.match(d)) return false;
        return true;
    });
};
