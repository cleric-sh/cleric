import * as t from 'io-ts';
import { Route } from 'router5';

type Router5RestParams = Omit<
  Route,
  'name' | 'encodeParams' | 'decodeParams' | 'children' | 'defaultParams'
>;

export type RouteArgs<TProps extends t.Props> = Router5RestParams & {
  path: string;
  type?: TProps;
  defaultParams?: t.TypeOf<t.ExactC<t.TypeC<TProps>>>;
  children?: RoutesArgs;
};

export type RoutesArgs = {
  [key: string]: RouteArgs<{}>;
};

// export type RouteNode<TArgs extends RouteNodeArgs<any, any>> = TArgs extends RouteNodeArgs<
//   infer P,
//   infer C
// >
//   ? {
//       codec?: t.ExactC<t.TypeC<P>>;
//       defaultParams?: t.TypeOf<t.TypeC<P>>;
//       children?: RouteMap<C>;
//     } & Router5RestParams
//   : never;

// export type RouteMap<T extends RouteMapArgs> = {
//   [P in keyof T]: T[P] extends RouteNodeArgs<infer P, infer C>
//     ? RouteNode<RouteNodeArgs<P, C>>
//     : never;
// };

interface RouteFn {
  <TRouteArgs extends RouteArgs<any>>(args: TRouteArgs): TRouteArgs;
}

export const route: RouteFn = args => args;

interface RoutesFn {
  <TRoutesArgs extends RoutesArgs>(args: TRoutesArgs): TRoutesArgs;
}

export const routes: RoutesFn = args => args;
