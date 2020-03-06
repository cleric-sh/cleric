import { createRouter, SubscribeState, Route } from 'router5';
import { from, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRouteMapToRoutes } from './convertRouteMapToRoutes';
import { readRouteState } from './readRouteState';
import { createStore, createModule } from '@cleric/store';
import { Source, Store } from '@cleric/store/src/store';
import { RoutesArgs, RouteArgs } from './route';
// import { RouteState } from '.';
import browserPlugin from 'router5-plugin-browser';
import * as t from 'io-ts';
import { RouteMap, RouteNode, RoutesState } from '.';

const convertRoutesArgsToRouteMap = (args: RoutesArgs): RouteMap => {
  const convertRouteArgsToRouteNode = ({
    type,
    children,
    ...rest
  }: RouteArgs<{}>): RouteNode<{}> => ({
    codec: type ? t.exact(t.type(type)) : undefined,
    children: children ? convertRoutesArgsToRouteMap(children) : undefined,
    ...rest,
  });

  return Object.getOwnPropertyNames(args).reduce((acc, name) => {
    acc[name] = convertRouteArgsToRouteNode(args[name]);
    return acc;
  }, {});
};

export const createRoutes = <TRoutesArgs extends RoutesArgs>(
  routesArgs: TRoutesArgs,
): Store<RoutesState<TRoutesArgs>> => {
  const routeMap = convertRoutesArgsToRouteMap(routesArgs);
  const routes: Route[] = convertRouteMapToRoutes(routeMap);
  const router = createRouter(routes);
  const router$ = from((router as any) as Subscribable<SubscribeState>);
  const store = createStore<RoutesState<TRoutesArgs>>({} as any);

  const RouterModule = createModule<any, { router: Source<SubscribeState> }>('Router')({
    reducer: ({ router }) => router.pipe(map(state => readRouteState(routeMap, state))),
  });
  store.$mount(RouterModule, { router: router$ });
  router.usePlugin(
    browserPlugin({
      useHash: false,
    }),
  );
  router.start();
  return store;
};
