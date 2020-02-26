import { createRouter, SubscribeState, Route } from 'router5';
import { from, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRouteMapToRoutes } from './convertRouteMapToRoutes';
import { convertRouteMapToInitialState } from './convertRouteMapToInitialState';
import { readRouteState } from './readRouteState';
import { IRouteMap, Routes } from './index';

export const createRoutes = <TRouteMap extends IRouteMap>(routeMap: TRouteMap) => {
  const routes: Route[] = convertRouteMapToRoutes(routeMap);
  const initial: Routes<TRouteMap> = convertRouteMapToInitialState(routeMap);
  const router = createRouter(routes);
  return from((router as any) as Subscribable<SubscribeState>).pipe(
    map(state => readRouteState(routeMap, initial, state)),
  );
};
