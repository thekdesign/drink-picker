import Enum from 'enum';

// 情境：「幫我選」用的心情/天氣標籤
export const Mood = new Enum([
    'HAPPY',         // 心情好（什麼都好）
    'TIRED',         // 想提神（咖啡因 ↑）
    'SLEEPY',        // 累但晚了（咖啡因 ↓）
    'STRESSED',      // 壓力大（甜的 / 經典款）
    'HOT_DAY',       // 大熱天（消暑）
    'COLD_DAY',      // 冷天（暖身）
    'TIGHT_BUDGET',  // 預算緊（< 50 元）
    'TREAT_MYSELF',  // 犒賞自己（招牌不限價）
], {ignoreCase: false});
