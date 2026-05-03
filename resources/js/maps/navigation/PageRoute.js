import {PageRoute} from 'enums/navigation/PageRoute';
import {EnumMap} from 'libs/EnumMap';

// 主要內容頁（包在 AppContainer 下）
export const pageRouteMap = new EnumMap(PageRoute, {
    DRINK_LIST: {
        path: 'drinks',
        component: () => import('components/pages/drink/DrinkList.vue'),
        meta: {title: '飲料列表'},
    },
    DRINK_DETAIL: {
        path: 'drinks/:drinkId',
        component: () => import('components/pages/drink/DrinkDetail.vue'),
        meta: {title: '飲料詳情'},
    },
    SHOP_LIST: {
        path: 'shops',
        component: () => import('components/pages/shop/ShopList.vue'),
        meta: {title: '店家列表'},
    },
    SHOP_DETAIL: {
        path: 'shops/:shopId',
        component: () => import('components/pages/shop/ShopDetail.vue'),
        meta: {title: '店家詳情'},
    },
    FAVORITE_LIST: {
        path: 'favorites',
        component: () => import('components/pages/favorites/FavoriteList.vue'),
        meta: {title: '我的最愛'},
    },
    HISTORY_INDEX: {
        path: 'history',
        component: () => import('components/pages/history/HistoryIndex.vue'),
        meta: {title: '喝過紀錄'},
    },
    PICKER_INDEX: {
        path: 'picker',
        component: () => import('components/pages/picker/PickerIndex.vue'),
        meta: {title: '幫我選'},
    },
});

// 錯誤頁
export const errorPageRouteMap = new EnumMap(PageRoute, {
    NOT_FOUND: {
        path: '404',
        component: () => import('components/pages/error/NotFound.vue'),
        meta: {title: '404'},
    },
});
