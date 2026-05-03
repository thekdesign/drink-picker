<template>
    <div class="drink-list">
        <h1 class="drink-list__title">飲料</h1>
        <FilterPanel />

        <p class="drink-list__count">共 {{ filtered.length }} 杯</p>

        <div v-if="filtered.length" class="drink-list__grid">
            <DrinkCard v-for="d in filtered" :key="d.id" :drink="d" show-actions />
        </div>
        <p v-else class="drink-list__empty">沒有符合條件的飲料，試著放寬篩選 ☕️</p>
    </div>
</template>

<script>
import {useFilteredDrinks} from 'composables/useFilteredDrinks';
import DrinkCard from 'components/common/DrinkCard.vue';
import FilterPanel from 'components/common/FilterPanel.vue';

export default {
    name: 'DrinkList',
    components: {DrinkCard, FilterPanel},
    setup() {
        const {filtered} = useFilteredDrinks();
        return {filtered};
    },
};
</script>

<style lang="scss" scoped>
.drink-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__count {
        font-size: 0.9rem;
        color: theme('colors.gray.600');
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    &__empty {
        padding: 2rem;
        text-align: center;
        color: theme('colors.gray.500');
        background: theme('colors.white');
        border-radius: 16px;
    }
}
</style>
