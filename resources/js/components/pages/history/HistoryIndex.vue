<template>
    <div class="history">
        <h1 class="history__title">📒 喝過紀錄</h1>

        <section v-if="records.length" class="history__stats">
            <div>
                <p class="history__stat-num">{{ records.length }}</p>
                <p class="history__stat-label">總喝過</p>
            </div>
            <div>
                <p class="history__stat-num">{{ historyStore.averageRating }}</p>
                <p class="history__stat-label">平均評分</p>
            </div>
            <div>
                <p class="history__stat-num">{{ topDrink?.name || '—' }}</p>
                <p class="history__stat-label">最常喝</p>
            </div>
            <div>
                <p class="history__stat-num">{{ topShop?.name || '—' }}</p>
                <p class="history__stat-label">最常買</p>
            </div>
        </section>

        <table v-if="records.length" class="history__table">
            <thead>
                <tr>
                    <th>時間</th>
                    <th>飲料</th>
                    <th>店家</th>
                    <th>客製</th>
                    <th>評分</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in records" :key="r.id">
                    <td>{{ formatDate(r.drankAt) }}</td>
                    <td>
                        <RouterLink :to="{name: 'DRINK_DETAIL', params: {drinkId: r.drinkId}}">
                            {{ drinkStore.getById(r.drinkId)?.name || r.drinkId }}
                        </RouterLink>
                    </td>
                    <td>{{ shopStore.getById(r.shopId)?.name || r.shopId }}</td>
                    <td>
                        <span class="history__chip">{{ sweetnessLabelMap.get(r.sweetness)?.label }}</span>
                        <span class="history__chip">{{ iceLevelLabelMap.get(r.ice)?.label }}</span>
                        <span class="history__chip">{{ r.size }}</span>
                    </td>
                    <td><RatingStars :value="r.rating" readonly /></td>
                    <td>
                        <button type="button" class="history__del" @click="historyStore.removeRecord(r.id)">刪</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else class="history__empty">還沒有任何紀錄。到飲料詳情頁加上你今天的這杯吧 🥤</p>
    </div>
</template>

<script>
import {computed} from 'vue';
import dayjs from 'dayjs';
import {useDrinkStore} from 'stores/drink/drink';
import {useShopStore} from 'stores/shop/shop';
import {useHistoryStore} from 'stores/history/history';
import {sweetnessLabelMap} from 'maps/drink/Sweetness';
import {iceLevelLabelMap} from 'maps/drink/IceLevel';
import RatingStars from 'components/common/RatingStars.vue';

const topByCount = (countMap) => {
    const entries = Object.entries(countMap);
    if (entries.length === 0) return undefined;
    return entries.reduce((best, cur) => (cur[1] > best[1] ? cur : best))[0];
};

export default {
    name: 'HistoryIndex',
    components: {RatingStars},
    setup() {
        const drinkStore = useDrinkStore();
        const shopStore = useShopStore();
        const historyStore = useHistoryStore();

        const records = computed(() => historyStore.sortedRecords);

        const topDrink = computed(() => {
            const id = topByCount(historyStore.countByDrinkId);
            return id ? drinkStore.getById(id) : undefined;
        });
        const topShop = computed(() => {
            const id = topByCount(historyStore.countByShopId);
            return id ? shopStore.getById(id) : undefined;
        });

        const formatDate = (ts) => dayjs(ts).format('MM/DD HH:mm');

        return {
            records, historyStore, drinkStore, shopStore,
            topDrink, topShop,
            sweetnessLabelMap, iceLevelLabelMap,
            formatDate,
        };
    },
};
</script>

<style lang="scss" scoped>
.history {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__stats {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 0.75rem;

        > div {
            padding: 1rem;
            background: theme('colors.white');
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
    }

    &__stat-num {
        font-size: 1.5rem;
        font-weight: 800;
        color: theme('colors.primary.700');
    }

    &__stat-label {
        font-size: 0.8rem;
        color: theme('colors.gray.600');
    }

    &__table {
        width: 100%;
        background: theme('colors.white');
        border-radius: 16px;
        overflow: hidden;
        border-collapse: collapse;
        font-size: 0.9rem;

        th, td {
            padding: 0.6rem 0.75rem;
            text-align: left;
            border-bottom: 1px dashed theme('colors.gray.200');
        }

        th {
            background: theme('colors.gray.100');
            font-weight: 600;
            font-size: 0.8rem;
            color: theme('colors.gray.600');
        }

        a:hover { color: theme('colors.primary.600'); text-decoration: underline; }
    }

    &__chip {
        display: inline-block;
        margin-right: 0.25rem;
        padding: 0.1rem 0.4rem;
        background: theme('colors.gray.200');
        border-radius: 999px;
        font-size: 0.75rem;
    }

    &__del {
        font-size: 0.85rem;
        color: theme('colors.red.500');

        &:hover { text-decoration: underline; }
    }

    &__empty {
        padding: 3rem 1rem;
        text-align: center;
        color: theme('colors.gray.500');
        background: theme('colors.white');
        border-radius: 16px;
    }
}
</style>
