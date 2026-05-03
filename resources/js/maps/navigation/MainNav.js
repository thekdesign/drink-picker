import {PageRoute} from 'enums/navigation/PageRoute';

// 主導覽：首頁 + 主要頁面
export const mainNavList = [
    {key: PageRoute.HOME_INDEX.key,    label: '首頁',     icon: '🏠'},
    {key: PageRoute.DRINK_LIST.key,    label: '飲料',     icon: '🥤'},
    {key: PageRoute.SHOP_LIST.key,     label: '店家',     icon: '🏪'},
    {key: PageRoute.PICKER_INDEX.key,  label: '幫我選',   icon: '🎲'},
    {key: PageRoute.FAVORITE_LIST.key, label: '我的最愛', icon: '⭐'},
    {key: PageRoute.HISTORY_INDEX.key, label: '紀錄',     icon: '📒'},
];
