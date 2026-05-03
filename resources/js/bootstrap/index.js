import {setActivePinia} from 'pinia';
import {prepareCatalog} from './catalog';
import {prepareUserPreference} from './userPreference';
import {prepareStoreSubscription} from './store';
import {preparePageRoute} from './router';

/**
 * mount 之前要把：
 *   1. 飲料 / 店家目錄載入
 *   2. localStorage 個人化資料還原（最愛、紀錄、封鎖清單）
 *   3. store 訂閱（變更同步回 localStorage）
 *   4. 路由註冊
 * 都備好。否則第一次進頁會看到空狀態閃跳。
 */
export const boot = async ({pinia}) => {
    setActivePinia(pinia);

    await prepareCatalog();
    await prepareUserPreference();

    await Promise.all([
        prepareStoreSubscription(),
        preparePageRoute(),
    ]);
};
