import Enum from 'enum';

export const IceLevel = new Enum([
    'HOT',           // 溫熱
    'WARM',          // 去冰
    'LESS_ICE',      // 少冰
    'STANDARD',      // 正常冰
    'EXTRA_ICE',     // 多冰
], {ignoreCase: false});
