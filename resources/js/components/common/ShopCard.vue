<template>
    <article class="shop-card">
        <header class="shop-card__head">
            <span class="shop-card__logo">{{ shop.logo }}</span>
            <RouterLink
                :to="{name: 'SHOP_DETAIL', params: {shopId: shop.id}}"
                class="shop-card__name"
            >
                {{ shop.name }}
            </RouterLink>
            <span class="shop-card__rating">⭐ {{ shop.rating }}</span>
        </header>

        <ul class="shop-card__highlights">
            <li v-for="h in shop.highlights" :key="h">{{ h }}</li>
        </ul>

        <dl class="shop-card__meta">
            <div>
                <dt>步行</dt>
                <dd>{{ shop.walkMinutes }} 分鐘</dd>
            </div>
            <div>
                <dt>營業</dt>
                <dd>{{ shop.openHour }}</dd>
            </div>
            <div>
                <dt>價位</dt>
                <dd>{{ shop.priceLevel }}</dd>
            </div>
        </dl>

        <footer class="shop-card__foot">
            <a
                :href="shop.menuUrl"
                target="_blank"
                rel="noopener"
                class="shop-card__btn shop-card__btn--primary"
            >看菜單 →</a>
            <a
                v-if="shop.deliveryUrls?.uberEats"
                :href="shop.deliveryUrls.uberEats"
                target="_blank"
                rel="noopener"
                class="shop-card__btn"
            >Uber</a>
            <a
                v-if="shop.deliveryUrls?.foodpanda"
                :href="shop.deliveryUrls.foodpanda"
                target="_blank"
                rel="noopener"
                class="shop-card__btn"
            >panda</a>
        </footer>
    </article>
</template>

<script>
export default {
    name: 'ShopCard',
    props: {
        shop: {type: Object, required: true},
    },
};
</script>

<style lang="scss" scoped>
.shop-card {
    padding: 1rem;
    background: theme('colors.white');
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &__head {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    &__logo {
        font-size: 1.5rem;
    }

    &__name {
        flex: 1;
        font-weight: 700;
        font-size: 1.05rem;

        &:hover { color: theme('colors.primary.600'); }
    }

    &__rating {
        font-size: 0.85rem;
        color: theme('colors.yellow.700');
    }

    &__highlights {
        margin: 0;
        padding-left: 1rem;
        font-size: 0.85rem;
        color: theme('colors.gray.600');

        li { line-height: 1.6; list-style: disc; }
    }

    &__meta {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.25rem;
        font-size: 0.8rem;
        margin: 0;
        padding: 0.5rem 0;
        border-top: 1px dashed theme('colors.gray.200');
        border-bottom: 1px dashed theme('colors.gray.200');

        dt { color: theme('colors.gray.500'); }
        dd { color: theme('colors.gray.800'); margin: 0; font-weight: 500; }
    }

    &__foot {
        display: flex;
        gap: 0.4rem;
    }

    &__btn {
        font-size: 0.8rem;
        padding: 0.35rem 0.65rem;
        border-radius: 999px;
        background: theme('colors.gray.200');
        color: theme('colors.gray.700');
        transition: background 0.15s;

        &:hover { background: theme('colors.gray.300'); }

        &--primary {
            background: theme('colors.primary.500');
            color: theme('colors.white');

            &:hover { background: theme('colors.primary.600'); }
        }
    }
}
</style>
