import {pageRouteMap, errorPageRouteMap} from 'maps/navigation/PageRoute';

const toRoute = (key, value) => ({
    path: value.path,
    name: key,
    component: value.component,
    meta: value.meta || {},
});

const flatten = (map) => map.entries().map(([enumValue, value]) => toRoute(enumValue.key, value));

export const createAppContentRouteList = () => flatten(pageRouteMap);
export const createAppErrorRouteList = () => flatten(errorPageRouteMap);
