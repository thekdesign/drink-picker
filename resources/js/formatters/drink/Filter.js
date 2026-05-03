/**
 * 套用 filter 條件到飲料清單。純函式：方便單測。
 */
export const filterDrinkList = (drinks, filter, {blocklist = []} = {}) => {
    const keyword = (filter.keyword || '').trim().toLowerCase();

    return drinks.filter((d) => {
        if (filter.excludeBlocked && blocklist.includes(d.id)) return false;
        if (filter.shopIds?.length && !filter.shopIds.includes(d.shopId)) return false;
        if (filter.tags?.length && !filter.tags.some((t) => d.tags.includes(t))) return false;
        if (filter.caffeineLevels?.length && !filter.caffeineLevels.includes(d.caffeine)) return false;
        if (Number.isFinite(filter.priceMax) && d.priceM > filter.priceMax) return false;
        if (keyword) {
            const hay = `${d.name}${d.description}`.toLowerCase();
            if (!hay.includes(keyword)) return false;
        }
        return true;
    });
};
