import {Route} from 'router5';
import {RouteMap} from './';

export const convertRouteMapToRoutes = (routeMap: RouteMap): Route[] => {
  return Object.getOwnPropertyNames(routeMap).map(name => {
    const {children, ...rest} = routeMap[name];

    return {
      name,
      ...rest,
      children : children ? convertRouteMapToRoutes(children) : undefined,
    };
  });
};
