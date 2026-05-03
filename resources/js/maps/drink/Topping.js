import {EnumMap} from 'libs/EnumMap';
import {Topping} from 'enums/drink/Topping';

export const toppingLabelMap = new EnumMap(Topping, {
    BOBA:           {label: '珍珠'},
    MINI_BOBA:      {label: '小珍珠'},
    PUDDING:        {label: '布丁'},
    GRASS_JELLY:    {label: '仙草'},
    COCONUT_JELLY:  {label: '椰果'},
    AIYU:           {label: '愛玉'},
    TARO_PASTE:     {label: '芋泥'},
    RED_BEAN:       {label: '紅豆'},
    CHEESE_FOAM:    {label: '奶蓋'},
    OAT_MILK:       {label: '燕麥奶'},
});
