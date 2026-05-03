import {EnumMap} from 'libs/EnumMap';
import {Mood} from 'enums/drink/Mood';
import {Tag} from 'enums/drink/Tag';
import {Caffeine} from 'enums/drink/Caffeine';

/**
 * 「幫我選」用：心情 → 推薦條件。
 * matcher(drink) 會在 drinkApi 裡用來篩選候選池。
 */
export const moodMap = new EnumMap(Mood, {
    HAPPY: {
        label: '心情好 🙂',
        match: () => true,
    },
    TIRED: {
        label: '想提神 ☕️',
        match: (d) => d.caffeine === Caffeine.HIGH.key || d.caffeine === Caffeine.MEDIUM.key,
    },
    SLEEPY: {
        label: '累但晚了 🌙',
        match: (d) => d.caffeine === Caffeine.NONE.key || d.caffeine === Caffeine.LOW.key,
    },
    STRESSED: {
        label: '壓力大 🍰',
        match: (d) => d.tags.includes(Tag.MILK_TEA.key) || d.tags.includes(Tag.CLASSIC.key),
    },
    HOT_DAY: {
        label: '大熱天 🥵',
        match: (d) => d.tags.includes(Tag.COOL_DOWN.key) || d.tags.includes(Tag.SMOOTHIE.key) || d.tags.includes(Tag.FRUIT.key),
    },
    COLD_DAY: {
        label: '冷天 🥶',
        match: (d) => d.tags.includes(Tag.WARM_UP.key) || d.tags.includes(Tag.MILK_TEA.key),
    },
    TIGHT_BUDGET: {
        label: '預算緊 💸',
        match: (d) => d.priceM <= 50,
    },
    TREAT_MYSELF: {
        label: '犒賞自己 💝',
        match: (d) => d.tags.includes(Tag.SIGNATURE.key),
    },
});
