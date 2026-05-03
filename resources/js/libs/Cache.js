/**
 * localStorage 包裝，含 ttl 支援。沒有 cookie 子模組（純前端工具站不需要）。
 */
const localStorageWrapper = {
    get(key) {
        try {
            const raw = window.localStorage.getItem(key);
            if (!raw) return undefined;

            const parsed = JSON.parse(raw);
            if (parsed && typeof parsed === 'object' && 'value' in parsed) {
                if (parsed.ttl && parsed.ttl > 0 && Date.now() > parsed.expireAt) {
                    window.localStorage.removeItem(key);
                    return undefined;
                }
                return parsed.value;
            }
            return parsed;
        } catch {
            return undefined;
        }
    },
    set(key, value, {ttl = -1} = {}) {
        const wrapped = {
            value,
            ttl,
            expireAt: ttl > 0 ? Date.now() + ttl : -1,
        };
        window.localStorage.setItem(key, JSON.stringify(wrapped));
    },
    remove(key) {
        window.localStorage.removeItem(key);
    },
};

export const Cache = {
    localStorage: localStorageWrapper,
};
