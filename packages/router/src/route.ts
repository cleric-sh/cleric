import * as t from 'io-ts';
import {Route} from 'router5';

type Router5RestParams = Omit<Route, 'name'|'encodeParams'|'decodeParams'|
                              'children'|'defaultParams'>;

export type RouteArgs<TProps extends t.Props> = Router5RestParams&{
  path: string;
  type?: TProps;
  defaultParams?: t.TypeOf<t.ExactC<t.TypeC<TProps>>>;
  children?: RoutesArgs;
};

export type RoutesArgs = {
  [key: string]: RouteArgs<{}>;
};

interface RouteFn {
  <TRouteArgs extends RouteArgs<any>>(args: TRouteArgs): TRouteArgs;
}

export const route: RouteFn = args => args;

interface RoutesFn {
  <TRoutesArgs extends RoutesArgs>(args: TRoutesArgs): TRoutesArgs;
}

export const routes: RoutesFn = args => args;
