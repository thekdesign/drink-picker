<template>
    <div class="picker">
        <h1 class="picker__title">🎲 幫我選一杯</h1>
        <p class="picker__lead">告訴我你的心情與預算，我從目錄抽 3 杯給你挑。</p>

        <section class="picker__panel">
            <h2 class="picker__sub">心情 / 情境</h2>
            <div class="picker__moods">
                <button
                    v-for="opt in moodOptions"
                    :key="opt.key"
                    type="button"
                    class="picker__mood"
                    :class="{'is-active': pickerStore.moodKey === opt.key}"
                    @click="pickerStore.updateMood(pickerStore.moodKey === opt.key ? undefined : opt.key)"
                >{{ opt.label }}</button>
            </div>

            <h2 class="picker__sub">最高預算（M 杯）</h2>
            <div class="picker__price">
                <input
                    type="range"
                    min="30"
                    max="100"
                    step="5"
                    :value="pickerStore.priceMax ?? 100"
                    @input="onPriceInput"
                >
                <span class="picker__price-value">${{ pickerStore.priceMax ?? '不限' }}</span>
            </div>

            <button
                type="button"
                class="picker__draw"
                :disabled="pickerStore.spinning"
                @click="onDraw"
            >
                {{ pickerStore.spinning ? '抽選中⋯' : '抽 3 杯！' }}
            </button>
        </section>

        <section v-if="pickerStore.candidates.length || pickerStore.spinning" class="picker__result">
            <h2 class="picker__sub">候選</h2>
            <div v-if="pickerStore.spinning" class="picker__spinner">🥤 🌪️ 飲料抽選中⋯</div>
            <div v-else class="picker__grid">
                <DrinkCard v-for="d in pickerStore.candidates" :key="d.id" :drink="d" />
            </div>
            <p v-if="!pickerStore.spinning && pickerStore.candidates.length === 0" class="picker__noresult">
                這個條件找不到飲料，放寬看看？
            </p>
        </section>
    </div>
</template>

<script>
import {computed} from 'vue';
import {usePickerStore} from 'stores/picker/picker';
import {useRandomPick} from 'composables/useRandomPick';
import {Mood} from 'enums/drink/Mood';
import {moodMap} from 'maps/drink/Mood';
import DrinkCard from 'components/common/DrinkCard.vue';

export default {
    name: 'PickerIndex',
    components: {DrinkCard},
    setup() {
        const pickerStore = usePickerStore();
        const {drawCandidates} = useRandomPick();

        const moodOptions = computed(() => Mood.enums.map((e) => ({
            key: e.key,
            label: moodMap.get(e.key)?.label || e.key,
        })));

        const onPriceInput = (event) => {
            const v = Number(event.target.value);
            pickerStore.updatePriceMax(v >= 100 ? undefined : v);
        };

        const onDraw = () => drawCandidates(3);

        return {pickerStore, moodOptions, onPriceInput, onDraw};
    },
};
</script>

<style lang="scss" scoped>
.picker {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &__title {
        font-size: 1.75rem;
        font-weight: 800;
    }

    &__lead {
        color: theme('colors.gray.600');
    }

    &__panel {
        padding: 1.25rem;
        background: theme('colors.white');
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    &__sub {
        font-size: 1rem;
        font-weight: 700;
        margin-top: 0.5rem;
    }

    &__moods {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }

    &__mood {
        padding: 0.4rem 0.85rem;
        border-radius: 999px;
        background: theme('colors.gray.200');
        color: theme('colors.gray.700');
        font-size: 0.9rem;

        &:hover { background: theme('colors.gray.300'); }

        &.is-active {
            background: theme('colors.primary.500');
            color: theme('colors.white');
        }
    }

    &__price {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        input { flex: 1; }
    }

    &__price-value {
        font-weight: 700;
        color: theme('colors.primary.700');
        min-width: 4rem;
        text-align: right;
    }

    &__draw {
        align-self: flex-start;
        padding: 0.75rem 2rem;
        background: theme('colors.primary.600');
        color: theme('colors.white');
        font-weight: 700;
        border-radius: 999px;
        font-size: 1rem;

        &:hover:not(:disabled) { background: theme('colors.primary.700'); }
        &:disabled { opacity: 0.6; cursor: not-allowed; }
    }

    &__result {
        padding: 1.25rem;
        background: theme('colors.accent.100');
        border-radius: 16px;
    }

    &__spinner {
        text-align: center;
        font-size: 1.5rem;
        padding: 2rem;
        animation: shake 0.4s infinite;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 1rem;
    }

    &__noresult {
        text-align: center;
        color: theme('colors.gray.600');
        padding: 1rem;
    }
}

@keyframes shake {
    0%   { transform: translateX(0); }
    25%  { transform: translateX(-4px); }
    75%  { transform: translateX(4px); }
    100% { transform: translateX(0); }
}
</style>
