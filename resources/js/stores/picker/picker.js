import {defineStore} from 'pinia';

export const usePickerStore = defineStore('picker', {
    state: () => ({
        moodKey: undefined,
        priceMax: undefined,
        candidates: [],   // 抽出的 1~3 杯
        spinning: false,  // 動畫狀態
    }),
    actions: {
        updateMood(moodKey) {
            this.moodKey = moodKey;
        },
        updatePriceMax(price) {
            this.priceMax = price;
        },
        updateCandidates(drinks) {
            this.candidates = drinks;
        },
        updateSpinning(value) {
            this.spinning = value;
        },
        resetPicker() {
            this.$patch({moodKey: undefined, priceMax: undefined, candidates: [], spinning: false});
        },
    },
});
