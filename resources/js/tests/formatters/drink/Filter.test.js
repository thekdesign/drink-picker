import {filterDrinkList} from 'formatters/drink/Filter';

const drinks = [
    {id: 'a', shopId: 's1', name: '經典紅茶', description: '回甘', tags: ['PURE_TEA', 'CLASSIC'], caffeine: 'MEDIUM', priceM: 35},
    {id: 'b', shopId: 's2', name: '黑糖珍奶', description: '熱量高', tags: ['MILK_TEA', 'SIGNATURE'], caffeine: 'NONE', priceM: 65},
    {id: 'c', shopId: 's1', name: '美式咖啡', description: '無糖', tags: ['COFFEE', 'LOW_CAL'], caffeine: 'HIGH', priceM: 45},
];

describe('filterDrinkList', () => {
    it('returns full list when filter is empty', () => {
        const result = filterDrinkList(drinks, {});
        expect(result).toHaveLength(3);
    });

    it('filters by shopId', () => {
        const result = filterDrinkList(drinks, {shopIds: ['s1']});
        expect(result.map((d) => d.id)).toEqual(['a', 'c']);
    });

    it('filters by tag (any-match)', () => {
        const result = filterDrinkList(drinks, {tags: ['MILK_TEA']});
        expect(result.map((d) => d.id)).toEqual(['b']);
    });

    it('filters by caffeine levels', () => {
        const result = filterDrinkList(drinks, {caffeineLevels: ['HIGH', 'MEDIUM']});
        expect(result.map((d) => d.id)).toEqual(['a', 'c']);
    });

    it('filters by priceMax', () => {
        const result = filterDrinkList(drinks, {priceMax: 40});
        expect(result.map((d) => d.id)).toEqual(['a']);
    });

    it('filters by keyword (name or description, case-insensitive)', () => {
        expect(filterDrinkList(drinks, {keyword: '美式'}).map((d) => d.id)).toEqual(['c']);
        expect(filterDrinkList(drinks, {keyword: '回甘'}).map((d) => d.id)).toEqual(['a']);
    });

    it('respects blocklist when excludeBlocked=true', () => {
        const result = filterDrinkList(drinks, {excludeBlocked: true}, {blocklist: ['b']});
        expect(result.map((d) => d.id)).toEqual(['a', 'c']);
    });

    it('combines conditions with AND', () => {
        const result = filterDrinkList(drinks, {
            shopIds: ['s1'],
            caffeineLevels: ['HIGH'],
        });
        expect(result.map((d) => d.id)).toEqual(['c']);
    });
});
