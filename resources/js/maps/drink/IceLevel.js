import {EnumMap} from 'libs/EnumMap';
import {IceLevel} from 'enums/drink/IceLevel';

export const iceLevelLabelMap = new EnumMap(IceLevel, {
    HOT:        {label: '溫熱', icon: '♨️'},
    WARM:       {label: '去冰', icon: '🚫🧊'},
    LESS_ICE:   {label: '少冰', icon: '🧊'},
    STANDARD:   {label: '正常冰', icon: '🧊🧊'},
    EXTRA_ICE:  {label: '多冰', icon: '🧊🧊🧊'},
});
