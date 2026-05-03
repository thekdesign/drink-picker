import {EnumMap} from 'libs/EnumMap';
import {Sweetness} from 'enums/drink/Sweetness';

export const sweetnessLabelMap = new EnumMap(Sweetness, {
    NO_SUGAR:  {label: '無糖', percent: 0},
    QUARTER:   {label: '微糖', percent: 25},
    HALF:      {label: '半糖', percent: 50},
    LESS:      {label: '少糖', percent: 70},
    STANDARD:  {label: '正常糖', percent: 100},
});
