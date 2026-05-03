import Enum from 'enum';

export const PageRoute = new Enum([
    'HOME_INDEX',
    'DRINK_LIST',
    'DRINK_DETAIL',
    'SHOP_LIST',
    'SHOP_DETAIL',
    'FAVORITE_LIST',
    'HISTORY_INDEX',
    'PICKER_INDEX',
    'NOT_FOUND',
], {ignoreCase: false});
