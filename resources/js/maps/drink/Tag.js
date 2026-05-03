import {EnumMap} from 'libs/EnumMap';
import {Tag} from 'enums/drink/Tag';

export const tagLabelMap = new EnumMap(Tag, {
    CLASSIC:      {label: '經典'},
    FRUIT:        {label: '水果茶'},
    MILK_TEA:     {label: '奶茶'},
    PURE_TEA:     {label: '純茶'},
    COFFEE:       {label: '咖啡'},
    YAKULT:       {label: '養樂多'},
    CHEESE_FOAM:  {label: '奶蓋'},
    SMOOTHIE:     {label: '冰沙'},
    SEASONAL:     {label: '季節限定'},
    LOW_CAL:      {label: '低熱量'},
    WARM_UP:      {label: '暖身'},
    COOL_DOWN:    {label: '消暑'},
    SIGNATURE:    {label: '招牌'},
});
