import { IRouteMap } from '.';
import { Route } from 'router5';

export const convertRouteMapToRoutes = (routeMap: IRouteMap): Route[] => {
  return Object.getOwnPropertyNames(routeMap).map(name => {
    const { path, children } = routeMap[name];
    return {
      name,
      path,
      // defaultParams: params,
      children: children ? convertRouteMapToRoutes(children) : undefined,
    };
  });
};
