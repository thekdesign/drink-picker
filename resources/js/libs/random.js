export const pickRandom = (list, count = 1) => {
    if (!Array.isArray(list) || list.length === 0) return [];

    const pool = [...list];
    const picks = [];
    const n = Math.min(count, pool.length);

    for (let i = 0; i < n; i += 1) {
        const idx = Math.floor(Math.random() * pool.length);
        picks.push(pool.splice(idx, 1)[0]);
    }

    return picks;
};

export const pickOne = (list) => pickRandom(list, 1)[0];
