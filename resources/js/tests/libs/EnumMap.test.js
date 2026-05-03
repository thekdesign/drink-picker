import Enum from 'enum';
import {EnumMap} from 'libs/EnumMap';

const Color = new Enum(['RED', 'GREEN', 'BLUE'], {ignoreCase: false});

describe('EnumMap', () => {
    it('throws when mapping uses an unknown key', () => {
        expect(() => new EnumMap(Color, {YELLOW: 1})).toThrow(/not found in enum/);
    });

    it('looks up by enum instance and by string key', () => {
        const map = new EnumMap(Color, {RED: 'r', GREEN: 'g'});
        expect(map.get(Color.RED)).toBe('r');
        expect(map.get('GREEN')).toBe('g');
        expect(map.get('BLUE')).toBeUndefined();
    });

    it('exposes entries for iteration', () => {
        const map = new EnumMap(Color, {RED: 1, BLUE: 2});
        const pairs = map.entries();
        expect(pairs).toHaveLength(2);
        expect(pairs[0][0].key).toBe('RED');
        expect(pairs[0][1]).toBe(1);
    });
});
