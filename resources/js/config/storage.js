import {appConfig} from 'config/app';

const k = (suffix) => `${appConfig.storageKeyPrefix}${suffix}`;

export const StorageKey = {
    FAVORITES: k('favorites'),
    BLOCKLIST: k('blocklist'),
    HISTORY: k('history'),
    FILTER_DRAFT: k('filter::draft'),
};
