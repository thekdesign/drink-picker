<template>
    <div class="shop-list">
        <h1 class="shop-list__title">店家</h1>
        <p class="shop-list__count">共 {{ shopStore.list.length }} 家</p>
        <div class="shop-list__grid">
            <ShopCard v-for="s in shopStore.list" :key="s.id" :shop="s" />
        </div>
    </div>
</template>

<script>
import {useShopStore} from 'stores/shop/shop';
import ShopCard from 'components/common/ShopCard.vue';

export default {
    name: 'ShopList',
    components: {ShopCard},
    setup() {
        const shopStore = useShopStore();
        return {shopStore};
    },
};
</script>

<style lang="scss" scoped>
.shop-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__count {
        color: theme('colors.gray.600');
        font-size: 0.9rem;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
    }
}
</style>
