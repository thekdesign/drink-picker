<template>
    <div class="home">
        <section class="home__hero">
            <h1 class="home__title">今天喝什麼？</h1>
            <p class="home__sub">收錄 {{ drinkStore.list.length }} 杯飲料 / {{ shopStore.list.length }} 家店家</p>
            <div class="home__cta">
                <RouterLink :to="{name: 'PICKER_INDEX'}" class="home__cta-primary">🎲 幫我選一杯</RouterLink>
                <RouterLink :to="{name: 'DRINK_LIST'}" class="home__cta-secondary">瀏覽全部飲料 →</RouterLink>
            </div>
        </section>

        <section v-if="favoriteDrinks.length" class="home__section">
            <h2 class="home__section-title">⭐ 我的最愛</h2>
            <div class="home__grid">
                <DrinkCard v-for="d in favoriteDrinks.slice(0, 3)" :key="d.id" :drink="d" />
            </div>
            <RouterLink v-if="favoriteDrinks.length > 3" :to="{name: 'FAVORITE_LIST'}" class="home__more">
                看全部 {{ favoriteDrinks.length }} 杯 →
            </RouterLink>
        </section>

        <section v-if="recentDrinks.length" class="home__section">
            <h2 class="home__section-title">🕒 最近喝過</h2>
            <div class="home__grid">
                <DrinkCard v-for="d in recentDrinks.slice(0, 3)" :key="d.id" :drink="d" />
            </div>
        </section>

        <section class="home__section">
            <h2 class="home__section-title">🏪 店家一覽</h2>
            <div class="home__shop-grid">
                <ShopCard v-for="s in shopStore.list" :key="s.id" :shop="s" />
            </div>
        </section>
    </div>
</template>

<script>
import {computed} from 'vue';
import {useDrinkStore} from 'stores/drink/drink';
import {useShopStore} from 'stores/shop/shop';
import {useFavoriteStore} from 'stores/favorite/favorite';
import {useHistoryStore} from 'stores/history/history';
import DrinkCard from 'components/common/DrinkCard.vue';
import ShopCard from 'components/common/ShopCard.vue';

export default {
    name: 'HomeIndex',
    components: {DrinkCard, ShopCard},
    setup() {
        const drinkStore = useDrinkStore();
        const shopStore = useShopStore();
        const favoriteStore = useFavoriteStore();
        const historyStore = useHistoryStore();

        const favoriteDrinks = computed(() =>
            favoriteStore.favoriteIds
                .map((id) => drinkStore.getById(id))
                .filter(Boolean));

        const recentDrinks = computed(() =>
            historyStore.recentDrinkIds
                .map((id) => drinkStore.getById(id))
                .filter(Boolean));

        return {drinkStore, shopStore, favoriteDrinks, recentDrinks};
    },
};
</script>

<style lang="scss" scoped>
.home {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__hero {
        padding: 2rem 1.5rem;
        text-align: center;
        background: linear-gradient(135deg, theme('colors.primary.300'), theme('colors.accent.300'));
        border-radius: 24px;
        color: theme('colors.gray.900');
    }

    &__title {
        font-size: 2rem;
        font-weight: 900;
        margin-bottom: 0.5rem;
    }

    &__sub {
        color: theme('colors.gray.700');
        margin-bottom: 1rem;
    }

    &__cta {
        display: flex;
        justify-content: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    &__cta-primary {
        padding: 0.75rem 1.5rem;
        background: theme('colors.primary.700');
        color: theme('colors.white');
        border-radius: 999px;
        font-weight: 700;

        &:hover { background: theme('colors.primary.800'); }
    }

    &__cta-secondary {
        padding: 0.75rem 1.5rem;
        background: theme('colors.white');
        color: theme('colors.primary.700');
        border-radius: 999px;
        font-weight: 500;

        &:hover { background: theme('colors.primary.100'); }
    }

    &__section-title {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    &__shop-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    &__more {
        display: inline-block;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: theme('colors.primary.600');

        &:hover { text-decoration: underline; }
    }
}
</style>
