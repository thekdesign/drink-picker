<template>
    <article class="drink-card">
        <header class="drink-card__head">
            <RouterLink
                :to="{name: 'DRINK_DETAIL', params: {drinkId: drink.id}}"
                class="drink-card__name"
            >
                {{ drink.name }}
            </RouterLink>
            <button
                type="button"
                class="drink-card__fav"
                :class="{'is-active': isFavorited}"
                :aria-label="isFavorited ? '取消收藏' : '加到我的最愛'"
                @click="onToggleFavorite"
            >
                {{ isFavorited ? '⭐' : '☆' }}
            </button>
        </header>

        <p v-if="shop" class="drink-card__shop">
            <RouterLink :to="{name: 'SHOP_DETAIL', params: {shopId: shop.id}}">
                {{ shop.logo }} {{ shop.name }}
            </RouterLink>
        </p>

        <p class="drink-card__desc">{{ drink.description }}</p>

        <div class="drink-card__tags">
            <TagChip
                v-for="tagKey in drink.tags"
                :key="tagKey"
                :label="tagLabelMap.get(tagKey)?.label || tagKey"
                variant="primary"
            />
            <TagChip :label="caffeineLabel" variant="accent" />
        </div>

        <footer class="drink-card__foot">
            <span class="drink-card__price">M ${{ drink.priceM }}<span class="drink-card__price-sep"> / </span>L ${{ drink.priceL }}</span>
            <span class="drink-card__kcal">{{ drink.kcalEstimate }} kcal</span>
        </footer>

        <div v-if="showActions" class="drink-card__actions">
            <button type="button" class="drink-card__action drink-card__action--block" @click="onToggleBlock">
                {{ isBlocked ? '取消封鎖' : '不要再推薦' }}
            </button>
        </div>
    </article>
</template>

<script>
import {computed} from 'vue';
import {useFavoriteStore} from 'stores/favorite/favorite';
import {useShopStore} from 'stores/shop/shop';
import {tagLabelMap} from 'maps/drink/Tag';
import {caffeineLabelMap} from 'maps/drink/Caffeine';
import TagChip from 'components/common/TagChip.vue';

export default {
    name: 'DrinkCard',
    components: {TagChip},
    props: {
        drink: {type: Object, required: true},
        showActions: {type: Boolean, default: false},
    },
    setup(props) {
        const favoriteStore = useFavoriteStore();
        const shopStore = useShopStore();

        const isFavorited = computed(() => favoriteStore.isFavorited(props.drink.id));
        const isBlocked = computed(() => favoriteStore.isBlocked(props.drink.id));
        const shop = computed(() => shopStore.getById(props.drink.shopId));
        const caffeineLabel = computed(() =>
            caffeineLabelMap.get(props.drink.caffeine)?.shortLabel || props.drink.caffeine);

        const onToggleFavorite = () => favoriteStore.toggleFavorite(props.drink.id);
        const onToggleBlock = () => favoriteStore.toggleBlock(props.drink.id);

        return {
            isFavorited, isBlocked, shop, caffeineLabel,
            tagLabelMap,
            onToggleFavorite, onToggleBlock,
        };
    },
};
</script>

<style lang="scss" scoped>
.drink-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    background: theme('colors.white');
    border-radius: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: transform 0.15s, box-shadow 0.15s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    }

    &__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.5rem;
    }

    &__name {
        font-size: 1.1rem;
        font-weight: 700;
        color: theme('colors.gray.900');

        &:hover { color: theme('colors.primary.600'); }
    }

    &__fav {
        font-size: 1.4rem;
        color: theme('colors.gray.300');
        line-height: 1;

        &.is-active { color: theme('colors.yellow.500'); }
    }

    &__shop a {
        font-size: 0.85rem;
        color: theme('colors.primary.600');
        &:hover { text-decoration: underline; }
    }

    &__desc {
        font-size: 0.85rem;
        color: theme('colors.gray.600');
        line-height: 1.5;
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    &__foot {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-top: 0.25rem;
        padding-top: 0.5rem;
        border-top: 1px dashed theme('colors.gray.200');
    }

    &__price {
        font-weight: 700;
        color: theme('colors.primary.700');
    }

    &__price-sep {
        color: theme('colors.gray.400');
        font-weight: 400;
    }

    &__kcal {
        font-size: 0.8rem;
        color: theme('colors.gray.500');
    }

    &__actions {
        display: flex;
        justify-content: flex-end;
    }

    &__action {
        font-size: 0.8rem;
        padding: 0.25rem 0.5rem;
        color: theme('colors.gray.500');

        &--block:hover { color: theme('colors.red.500'); }
    }
}
</style>
