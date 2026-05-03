import {EnumMap} from 'libs/EnumMap';
import {Caffeine} from 'enums/drink/Caffeine';

export const caffeineLabelMap = new EnumMap(Caffeine, {
    NONE:    {label: '無咖啡因', shortLabel: '無咖'},
    LOW:     {label: '低咖啡因', shortLabel: '低咖'},
    MEDIUM:  {label: '中咖啡因', shortLabel: '中咖'},
    HIGH:    {label: '高咖啡因', shortLabel: '高咖'},
});
