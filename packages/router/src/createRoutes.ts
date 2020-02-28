import { createRouter, SubscribeState, Route } from 'router5';
import { from, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRouteMapToRoutes } from './convertRouteMapToRoutes';
import { convertRouteMapToInitialState } from './convertRouteMapToInitialState';
import { readRouteState } from './readRouteState';
import { IRouteMap, Routes } from './index';
import { createStore, createModule } from '@cleric/store';
import { Source } from '@cleric/store/src/store';

export const createRoutes = <TRouteMap extends IRouteMap>(routeMap: TRouteMap) => {
  const routes: Route[] = convertRouteMapToRoutes(routeMap);
  const initial: Routes<TRouteMap> = convertRouteMapToInitialState(routeMap);
  const router = createRouter(routes);
  const router$ = from((router as any) as Subscribable<SubscribeState>);

  const store = createStore(initial);

  const RouterModule = createModule<typeof initial, { router: Source<SubscribeState> }>('Router')({
    reducer: ({ router }, store) =>
      router.pipe(
        map(state => {
          store.$batch(mutator => {
            readRouteState(routeMap, mutator, state);
          });
        }),
      ),
  });
  store.$mount(RouterModule, { router: router$ });
  return store;
};
