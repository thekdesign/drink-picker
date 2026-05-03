import Enum from 'enum';

export const Topping = new Enum([
    'BOBA',          // 珍珠
    'MINI_BOBA',     // 小珍珠
    'PUDDING',       // 布丁
    'GRASS_JELLY',   // 仙草
    'COCONUT_JELLY', // 椰果
    'AIYU',          // 愛玉
    'TARO_PASTE',    // 芋泥
    'RED_BEAN',      // 紅豆
    'CHEESE_FOAM',   // 乳酪奶蓋
    'OAT_MILK',      // 燕麥奶（可換）
], {ignoreCase: false});
