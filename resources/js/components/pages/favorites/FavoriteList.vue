<template>
    <div class="favorite-list">
        <h1 class="favorite-list__title">⭐ 我的最愛</h1>

        <div v-if="favoriteDrinks.length" class="favorite-list__grid">
            <DrinkCard v-for="d in favoriteDrinks" :key="d.id" :drink="d" />
        </div>
        <p v-else class="favorite-list__empty">還沒有收藏，逛逛 <RouterLink :to="{name: 'DRINK_LIST'}">飲料列表</RouterLink> 把愛喝的星標起來吧 ⭐</p>

        <section v-if="blockedDrinks.length" class="favorite-list__blocked">
            <h2 class="favorite-list__sub">封鎖中（不會出現在「幫我選」與篩選結果）</h2>
            <ul>
                <li v-for="d in blockedDrinks" :key="d.id">
                    {{ d.name }}
                    <button type="button" @click="favoriteStore.toggleBlock(d.id)">取消封鎖</button>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useDrinkStore} from 'stores/drink/drink';
import {useFavoriteStore} from 'stores/favorite/favorite';
import DrinkCard from 'components/common/DrinkCard.vue';

export default {
    name: 'FavoriteList',
    components: {DrinkCard},
    setup() {
        const drinkStore = useDrinkStore();
        const favoriteStore = useFavoriteStore();

        const favoriteDrinks = computed(() => favoriteStore.favoriteIds
            .map((id) => drinkStore.getById(id))
            .filter(Boolean));

        const blockedDrinks = computed(() => favoriteStore.blocklist
            .map((id) => drinkStore.getById(id))
            .filter(Boolean));

        return {favoriteDrinks, blockedDrinks, favoriteStore};
    },
};
</script>

<style lang="scss" scoped>
.favorite-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
        font-size: 1.75rem;
        font-weight: 800;
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

        a { color: theme('colors.primary.600'); text-decoration: underline; }
    }

    &__blocked {
        padding: 1rem;
        background: theme('colors.gray.200');
        border-radius: 12px;
        font-size: 0.9rem;

        ul {
            margin: 0; padding: 0; list-style: none;
            display: flex; flex-direction: column; gap: 0.4rem;
        }
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: theme('colors.gray.700');
        }
        button {
            font-size: 0.8rem;
            color: theme('colors.red.600');
            text-decoration: underline;
        }
    }

    &__sub {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
}
</style>
