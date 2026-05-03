<template>
    <div v-if="shop" class="shop-detail">
        <RouterLink :to="{name: 'SHOP_LIST'}" class="shop-detail__back">← 回店家列表</RouterLink>

        <header class="shop-detail__head">
            <span class="shop-detail__logo">{{ shop.logo }}</span>
            <div>
                <h1 class="shop-detail__name">{{ shop.name }}</h1>
                <p class="shop-detail__rating">⭐ {{ shop.rating }}・{{ shop.priceLevel }}・步行 {{ shop.walkMinutes }} 分鐘</p>
                <p class="shop-detail__open">營業 {{ shop.openHour }}</p>
            </div>
        </header>

        <ul class="shop-detail__highlights">
            <li v-for="h in shop.highlights" :key="h">{{ h }}</li>
        </ul>

        <div class="shop-detail__links">
            <a :href="shop.menuUrl" target="_blank" rel="noopener" class="shop-detail__btn shop-detail__btn--primary">
                看完整菜單 →
            </a>
            <a
                v-if="shop.deliveryUrls?.uberEats"
                :href="shop.deliveryUrls.uberEats"
                target="_blank"
                rel="noopener"
                class="shop-detail__btn"
            >Uber Eats</a>
            <a
                v-if="shop.deliveryUrls?.foodpanda"
                :href="shop.deliveryUrls.foodpanda"
                target="_blank"
                rel="noopener"
                class="shop-detail__btn"
            >foodpanda</a>
        </div>

        <h2 class="shop-detail__section">這家的飲料 ({{ drinksOfShop.length }})</h2>
        <div class="shop-detail__grid">
            <DrinkCard v-for="d in drinksOfShop" :key="d.id" :drink="d" />
        </div>
    </div>
    <div v-else class="shop-detail shop-detail--empty">找不到這家店 🥲</div>
</template>

<script>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import {useShopStore} from 'stores/shop/shop';
import {useDrinkStore} from 'stores/drink/drink';
import DrinkCard from 'components/common/DrinkCard.vue';

export default {
    name: 'ShopDetail',
    components: {DrinkCard},
    setup() {
        const route = useRoute();
        const shopStore = useShopStore();
        const drinkStore = useDrinkStore();

        const shop = computed(() => shopStore.getById(route.params.shopId));
        const drinksOfShop = computed(() =>
            (shop.value ? drinkStore.list.filter((d) => d.shopId === shop.value.id) : []));

        return {shop, drinksOfShop};
    },
};
</script>

<style lang="scss" scoped>
.shop-detail {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__back {
        font-size: 0.9rem;
        color: theme('colors.primary.600');

        &:hover { text-decoration: underline; }
    }

    &__head {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
    }

    &__logo {
        font-size: 3rem;
        line-height: 1;
    }

    &__name {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__rating, &__open {
        color: theme('colors.gray.600');
        font-size: 0.9rem;
    }

    &__highlights {
        margin: 0;
        padding-left: 1.25rem;
        line-height: 1.8;
        color: theme('colors.gray.700');
    }

    &__links {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    &__btn {
        padding: 0.5rem 1rem;
        border-radius: 999px;
        background: theme('colors.gray.200');
        color: theme('colors.gray.700');
        font-size: 0.9rem;
        font-weight: 500;

        &:hover { background: theme('colors.gray.300'); }

        &--primary {
            background: theme('colors.primary.500');
            color: theme('colors.white');

            &:hover { background: theme('colors.primary.600'); }
        }
    }

    &__section {
        font-size: 1.2rem;
        font-weight: 700;
        margin-top: 0.5rem;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    &--empty {
        text-align: center;
        padding: 4rem 1rem;
        color: theme('colors.gray.500');
    }
}
</style>
