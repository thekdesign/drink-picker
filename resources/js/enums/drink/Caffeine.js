import Enum from 'enum';

export const Caffeine = new Enum([
    'NONE',          // 無咖啡因（果茶、奶昔）
    'LOW',           // 低（多數花茶、麥茶）
    'MEDIUM',        // 中（紅茶、烏龍）
    'HIGH',          // 高（綠茶濃縮、咖啡）
], {ignoreCase: false});
