import {useDrinkStore} from 'stores/drink/drink';
import {useShopStore} from 'stores/shop/shop';

export const prepareCatalog = async () => {
    const drinkStore = useDrinkStore();
    const shopStore = useShopStore();

    await Promise.all([
        drinkStore.requestGetDrinkList(),
        shopStore.requestGetShopList(),
    ]);
};
