import Enum from 'enum';

// 飲料標籤（用於篩選 / 推薦）
export const Tag = new Enum([
    'CLASSIC',       // 經典款
    'FRUIT',         // 水果茶
    'MILK_TEA',      // 奶茶
    'PURE_TEA',      // 純茶
    'COFFEE',        // 咖啡
    'YAKULT',        // 養樂多系列
    'CHEESE_FOAM',   // 乳酪奶蓋
    'SMOOTHIE',      // 冰沙
    'SEASONAL',      // 季節限定
    'LOW_CAL',       // 低熱量（< 200 kcal）
    'WARM_UP',       // 暖身（適合冬天）
    'COOL_DOWN',     // 消暑（適合夏天）
    'SIGNATURE',     // 招牌
], {ignoreCase: false});
