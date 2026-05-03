<template>
    <section class="filter-panel">
        <div class="filter-panel__row">
            <input
                type="search"
                :value="filterStore.keyword"
                placeholder="搜尋飲料名稱或描述"
                class="filter-panel__input"
                @input="onKeywordInput"
            >
            <button type="button" class="filter-panel__reset" @click="onReset">重設</button>
        </div>

        <div class="filter-panel__row">
            <span class="filter-panel__label">店家</span>
            <div class="filter-panel__chips">
                <button
                    v-for="shop in shopStore.list"
                    :key="shop.id"
                    type="button"
                    class="filter-panel__chip"
                    :class="{'is-active': filterStore.shopIds.includes(shop.id)}"
                    @click="toggleShop(shop.id)"
                >
                    {{ shop.logo }} {{ shop.name }}
                </button>
            </div>
        </div>

        <div class="filter-panel__row">
            <span class="filter-panel__label">類型</span>
            <div class="filter-panel__chips">
                <button
                    v-for="entry in tagOptions"
                    :key="entry.key"
                    type="button"
                    class="filter-panel__chip"
                    :class="{'is-active': filterStore.tags.includes(entry.key)}"
                    @click="toggleTag(entry.key)"
                >{{ entry.label }}</button>
            </div>
        </div>

        <div class="filter-panel__row">
            <span class="filter-panel__label">咖啡因</span>
            <div class="filter-panel__chips">
                <button
                    v-for="entry in caffeineOptions"
                    :key="entry.key"
                    type="button"
                    class="filter-panel__chip"
                    :class="{'is-active': filterStore.caffeineLevels.includes(entry.key)}"
                    @click="toggleCaffeine(entry.key)"
                >{{ entry.label }}</button>
            </div>
        </div>

        <div class="filter-panel__row">
            <span class="filter-panel__label">最高價（M 杯）</span>
            <div class="filter-panel__price">
                <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    :value="filterStore.priceMax ?? 100"
                    @input="onPriceInput"
                >
                <span class="filter-panel__price-value">${{ filterStore.priceMax ?? 100 }}</span>
            </div>
        </div>
    </section>
</template>

<script>
import {computed} from 'vue';
import debounce from 'lodash.debounce';
import {useFilterStore} from 'stores/filter/filter';
import {useShopStore} from 'stores/shop/shop';
import {Tag} from 'enums/drink/Tag';
import {Caffeine} from 'enums/drink/Caffeine';
import {tagLabelMap} from 'maps/drink/Tag';
import {caffeineLabelMap} from 'maps/drink/Caffeine';

export default {
    name: 'FilterPanel',
    setup() {
        const filterStore = useFilterStore();
        const shopStore = useShopStore();

        const tagOptions = computed(() => Tag.enums.map((e) => ({
            key: e.key,
            label: tagLabelMap.get(e.key)?.label || e.key,
        })));

        const caffeineOptions = computed(() => Caffeine.enums.map((e) => ({
            key: e.key,
            label: caffeineLabelMap.get(e.key)?.label || e.key,
        })));

        const onKeywordInput = debounce((event) => {
            filterStore.updateKeyword(event.target.value);
        }, 200);

        const toggleShop = (id) => {
            const set = new Set(filterStore.shopIds);
            if (set.has(id)) set.delete(id); else set.add(id);
            filterStore.updateShopIds([...set]);
        };

        const toggleTag = (key) => {
            const set = new Set(filterStore.tags);
            if (set.has(key)) set.delete(key); else set.add(key);
            filterStore.updateTags([...set]);
        };

        const toggleCaffeine = (key) => {
            const set = new Set(filterStore.caffeineLevels);
            if (set.has(key)) set.delete(key); else set.add(key);
            filterStore.updateCaffeineLevels([...set]);
        };

        const onPriceInput = (event) => {
            const v = Number(event.target.value);
            filterStore.updatePriceMax(v >= 100 ? undefined : v);
        };

        const onReset = () => filterStore.resetFilter();

        return {
            filterStore, shopStore,
            tagOptions, caffeineOptions,
            onKeywordInput, toggleShop, toggleTag, toggleCaffeine, onPriceInput, onReset,
        };
    },
};
</script>

<style lang="scss" scoped>
.filter-panel {
    padding: 1rem;
    background: theme('colors.white');
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    &__row {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    &__label {
        font-size: 0.85rem;
        font-weight: 500;
        color: theme('colors.gray.600');
        min-width: 5rem;
    }

    &__input {
        flex: 1;
        min-width: 180px;
        height: 36px;
        padding: 0 0.75rem;
        border: 1px solid theme('colors.gray.300');
        border-radius: 8px;

        &:focus {
            outline: none;
            border-color: theme('colors.primary.500');
        }
    }

    &__reset {
        font-size: 0.85rem;
        color: theme('colors.gray.600');
        text-decoration: underline;
    }

    &__chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.3rem;
    }

    &__chip {
        font-size: 0.8rem;
        padding: 0.25rem 0.6rem;
        border-radius: 999px;
        background: theme('colors.gray.200');
        color: theme('colors.gray.700');
        transition: background 0.1s, color 0.1s;

        &:hover { background: theme('colors.gray.300'); }

        &.is-active {
            background: theme('colors.primary.500');
            color: theme('colors.white');
        }
    }

    &__price {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
        min-width: 200px;

        input { flex: 1; }
    }

    &__price-value {
        font-weight: 700;
        color: theme('colors.primary.700');
        min-width: 3rem;
        text-align: right;
    }
}
</style>
