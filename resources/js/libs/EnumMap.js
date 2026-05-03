/**
 * Enum 對應表，啟動時即驗證 key 不會 typo / 漏寫。
 *
 * 用法：const map = new EnumMap(MyEnum, {KEY1: {...}, KEY2: {...}});
 */
export class EnumMap {
    constructor(enumInstance, mapping) {
        this.enumInstance = enumInstance;
        this.mapping = mapping;
        this._validate();
    }

    _validate() {
        const enumKeys = this.enumInstance.enums.map((e) => e.key);
        Object.keys(this.mapping).forEach((key) => {
            if (!enumKeys.includes(key)) {
                throw new Error(`EnumMap: key "${key}" not found in enum.`);
            }
        });
    }

    get(enumValue) {
        const key = typeof enumValue === 'string' ? enumValue : enumValue.key;
        return this.mapping[key];
    }

    has(enumValue) {
        const key = typeof enumValue === 'string' ? enumValue : enumValue.key;
        return key in this.mapping;
    }

    keys() {
        return Object.keys(this.mapping);
    }

    entries() {
        return Object.entries(this.mapping).map(([key, value]) => [
            this.enumInstance.get(key),
            value,
        ]);
    }
}
