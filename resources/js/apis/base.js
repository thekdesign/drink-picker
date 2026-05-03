/**
 * 純前端版本沒有 ky / 後端，base 層只提供「模擬非同步」的 helper，
 * 讓上面的 store action 仍可寫成 await 風格 — 之後真要接 API 替換成本最低。
 */
export const mockResponse = (payload, delayMs = 0) => new Promise((resolve) => {
    if (delayMs <= 0) {
        resolve(payload);
        return;
    }
    setTimeout(() => resolve(payload), delayMs);
});
