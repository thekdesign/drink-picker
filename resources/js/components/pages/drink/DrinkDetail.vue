<template>
    <div v-if="drink" class="drink-detail">
        <RouterLink :to="{name: 'DRINK_LIST'}" class="drink-detail__back">← 回列表</RouterLink>

        <header class="drink-detail__head">
            <div>
                <p class="drink-detail__shop">
                    <RouterLink v-if="shop" :to="{name: 'SHOP_DETAIL', params: {shopId: shop.id}}">
                        {{ shop.logo }} {{ shop.name }}
                    </RouterLink>
                </p>
                <h1 class="drink-detail__name">{{ drink.name }}</h1>
                <div class="drink-detail__tags">
                    <TagChip
                        v-for="tagKey in drink.tags"
                        :key="tagKey"
                        :label="tagLabelMap.get(tagKey)?.label || tagKey"
                        variant="primary"
                    />
                    <TagChip :label="caffeineLabelMap.get(drink.caffeine)?.label" variant="accent" />
                </div>
            </div>
            <button
                type="button"
                class="drink-detail__fav"
                :class="{'is-active': isFavorited}"
                @click="favoriteStore.toggleFavorite(drink.id)"
            >{{ isFavorited ? '⭐' : '☆' }}</button>
        </header>

        <p class="drink-detail__desc">{{ drink.description }}</p>

        <section class="drink-detail__panel">
            <h2 class="drink-detail__panel-title">這杯怎麼點</h2>
            <dl class="drink-detail__panel-grid">
                <div>
                    <dt>容量</dt>
                    <dd>M ${{ drink.priceM }} / L ${{ drink.priceL }}</dd>
                </div>
                <div>
                    <dt>熱量估計</dt>
                    <dd>約 {{ drink.kcalEstimate }} kcal</dd>
                </div>
                <div>
                    <dt>建議甜度</dt>
                    <dd>{{ sweetnessLabelMap.get(drink.defaultSweetness)?.label }}</dd>
                </div>
                <div>
                    <dt>建議冰塊</dt>
                    <dd>{{ iceLevelLabelMap.get(drink.defaultIce)?.label }}</dd>
                </div>
                <div v-if="drink.recommendedToppings?.length">
                    <dt>建議加料</dt>
                    <dd>
                        <span
                            v-for="t in drink.recommendedToppings"
                            :key="t"
                            class="drink-detail__topping"
                        >{{ toppingLabelMap.get(t)?.label || t }}</span>
                    </dd>
                </div>
            </dl>
        </section>

        <section class="drink-detail__panel">
            <h2 class="drink-detail__panel-title">記錄這杯</h2>
            <form class="drink-detail__form" @submit.prevent="onSubmitRecord">
                <label>
                    甜度
                    <select v-model="form.sweetness">
                        <option v-for="opt in sweetnessOptions" :key="opt.key" :value="opt.key">
                            {{ opt.label }}
                        </option>
                    </select>
                </label>
                <label>
                    冰塊
                    <select v-model="form.ice">
                        <option v-for="opt in iceOptions" :key="opt.key" :value="opt.key">
                            {{ opt.label }}
                        </option>
                    </select>
                </label>
                <label>
                    容量
                    <select v-model="form.size">
                        <option value="M">M</option>
                        <option value="L">L</option>
                    </select>
                </label>
                <label class="drink-detail__form-rating">
                    評分
                    <RatingStars :value="form.rating" @update:value="(v) => form.rating = v" />
                </label>
                <label class="drink-detail__form-note">
                    備註
                    <input v-model="form.note" type="text" placeholder="例：店員建議微糖剛好">
                </label>
                <button type="submit" class="drink-detail__submit">+ 新增紀錄</button>
            </form>
        </section>

        <section v-if="recordsForDrink.length" class="drink-detail__panel">
            <h2 class="drink-detail__panel-title">過往紀錄</h2>
            <ul class="drink-detail__history">
                <li v-for="r in recordsForDrink" :key="r.id">
                    <span class="drink-detail__history-date">{{ formatDate(r.drankAt) }}</span>
                    <span>{{ sweetnessLabelMap.get(r.sweetness)?.label }} / {{ iceLevelLabelMap.get(r.ice)?.label }} / {{ r.size }}</span>
                    <RatingStars :value="r.rating" readonly />
                    <span v-if="r.note" class="drink-detail__history-note">{{ r.note }}</span>
                </li>
            </ul>
        </section>
    </div>
    <div v-else class="drink-detail drink-detail--empty">
        找不到這杯飲料 🥲
    </div>
</template>

<script>
import {computed, reactive} from 'vue';
import {useRoute} from 'vue-router';
import dayjs from 'dayjs';
import {useDrinkStore} from 'stores/drink/drink';
import {useShopStore} from 'stores/shop/shop';
import {useFavoriteStore} from 'stores/favorite/favorite';
import {useHistoryStore} from 'stores/history/history';
import {Sweetness} from 'enums/drink/Sweetness';
import {IceLevel} from 'enums/drink/IceLevel';
import {sweetnessLabelMap} from 'maps/drink/Sweetness';
import {iceLevelLabelMap} from 'maps/drink/IceLevel';
import {tagLabelMap} from 'maps/drink/Tag';
import {caffeineLabelMap} from 'maps/drink/Caffeine';
import {toppingLabelMap} from 'maps/drink/Topping';
import TagChip from 'components/common/TagChip.vue';
import RatingStars from 'components/common/RatingStars.vue';

export default {
    name: 'DrinkDetail',
    components: {TagChip, RatingStars},
    setup() {
        const route = useRoute();
        const drinkStore = useDrinkStore();
        const shopStore = useShopStore();
        const favoriteStore = useFavoriteStore();
        const historyStore = useHistoryStore();

        const drink = computed(() => drinkStore.getById(route.params.drinkId));
        const shop = computed(() => (drink.value ? shopStore.getById(drink.value.shopId) : undefined));
        const isFavorited = computed(() => (drink.value ? favoriteStore.isFavorited(drink.value.id) : false));

        const form = reactive({
            sweetness: Sweetness.HALF.key,
            ice: IceLevel.STANDARD.key,
            size: 'M',
            rating: 0,
            note: '',
        });

        const sweetnessOptions = Sweetness.enums.map((e) => ({
            key: e.key,
            label: sweetnessLabelMap.get(e.key)?.label,
        }));
        const iceOptions = IceLevel.enums.map((e) => ({
            key: e.key,
            label: iceLevelLabelMap.get(e.key)?.label,
        }));

        const recordsForDrink = computed(() => historyStore.sortedRecords
            .filter((r) => r.drinkId === drink.value?.id));

        const formatDate = (ts) => dayjs(ts).format('YYYY-MM-DD HH:mm');

        const onSubmitRecord = () => {
            if (!drink.value) return;
            historyStore.addRecord({
                drinkId: drink.value.id,
                shopId: drink.value.shopId,
                sweetness: form.sweetness,
                ice: form.ice,
                size: form.size,
                rating: form.rating,
                note: form.note,
            });
            form.note = '';
            form.rating = 0;
        };

        return {
            drink, shop, isFavorited,
            favoriteStore, sweetnessLabelMap, iceLevelLabelMap, tagLabelMap, caffeineLabelMap, toppingLabelMap,
            form, sweetnessOptions, iceOptions,
            recordsForDrink, formatDate, onSubmitRecord,
        };
    },
};
</script>

<style lang="scss" scoped>
.drink-detail {
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
        align-items: flex-start;
        justify-content: space-between;
        gap: 1rem;
    }

    &__shop {
        font-size: 0.9rem;
        color: theme('colors.primary.600');
        margin-bottom: 0.25rem;
    }

    &__name {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__tags {
        display: flex;
        gap: 0.25rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    &__fav {
        font-size: 2rem;
        color: theme('colors.gray.300');
        line-height: 1;

        &.is-active { color: theme('colors.yellow.500'); }
    }

    &__desc {
        font-size: 1rem;
        line-height: 1.7;
        color: theme('colors.gray.700');
    }

    &__panel {
        padding: 1.25rem;
        background: theme('colors.white');
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    }

    &__panel-title {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.75rem;
    }

    &__panel-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.75rem;
        margin: 0;

        dt {
            font-size: 0.8rem;
            color: theme('colors.gray.500');
            margin-bottom: 0.25rem;
        }
        dd {
            font-weight: 600;
            color: theme('colors.gray.900');
            margin: 0;
        }
    }

    &__topping {
        display: inline-block;
        margin-right: 0.4rem;
        font-weight: 500;
    }

    &__form {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 0.75rem;
        align-items: end;

        label {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            font-size: 0.85rem;
            color: theme('colors.gray.600');
        }

        select, input[type="text"] {
            height: 36px;
            padding: 0 0.5rem;
            border: 1px solid theme('colors.gray.300');
            border-radius: 8px;
        }
    }

    &__form-rating {
        gap: 0.5rem !important;
    }

    &__form-note {
        grid-column: 1 / -1;
    }

    &__submit {
        grid-column: 1 / -1;
        height: 40px;
        background: theme('colors.primary.600');
        color: theme('colors.white');
        border-radius: 8px;
        font-weight: 600;

        &:hover { background: theme('colors.primary.700'); }
    }

    &__history {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        li {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 0;
            border-bottom: 1px dashed theme('colors.gray.200');
            font-size: 0.9rem;

            &:last-child { border-bottom: none; }
        }
    }

    &__history-date {
        font-size: 0.8rem;
        color: theme('colors.gray.500');
        min-width: 130px;
    }

    &__history-note {
        flex-basis: 100%;
        font-size: 0.85rem;
        color: theme('colors.gray.600');
    }

    &--empty {
        text-align: center;
        padding: 4rem 1rem;
        color: theme('colors.gray.500');
    }
}
</style>
