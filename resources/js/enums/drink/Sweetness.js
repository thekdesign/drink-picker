import Enum from 'enum';

// 對應一般手搖店甜度選項
export const Sweetness = new Enum([
    'NO_SUGAR',      // 無糖
    'QUARTER',       // 微糖（1 分糖）
    'HALF',          // 半糖
    'LESS',          // 少糖（7 分糖）
    'STANDARD',      // 正常糖
], {ignoreCase: false});
