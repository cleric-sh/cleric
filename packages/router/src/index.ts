import * as t from 'io-ts';
import { createRoutes } from './createRoutes';
import { route, RouteArgs, RoutesArgs } from './route';
import { Strict } from 'Union/Strict';
import { Required } from 'Object/_api';

export type RouteNode<TProps extends t.Props> = Omit<RouteArgs<TProps>, 'type' | 'children'> & {
  codec?: t.ExactC<t.TypeC<TProps>>;
  children?: RouteMap;
};

export type RouteMap = {
  [key: string]: RouteNode<{}>;
};

type RouteParams<TParams extends t.Props = {}> = {} extends TParams
  ? {}
  : {
      params: t.TypeOfProps<TParams>;
    };

type RouteProps = {
  name: string;
  path: string;
};

// Todo: move these to @cleric/common if there's no equivalent in ts-toolbelt.
type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

type OnlyKnown<T extends Record<any, any>> = Pick<T, KnownKeys<T>>;

export type RoutesState<TRoutesArgs extends RoutesArgs, TLastProps extends t.Props = {}> = {
  [P in keyof TRoutesArgs]: TRoutesArgs[P] extends RouteArgs<infer U>
    ? RouteProps &
        RouteParams<Strict<TLastProps & U>> &
        RoutesState<NonNullable<TRoutesArgs[P]['children']>, Strict<TLastProps & OnlyKnown<U>>>
    : never;
};

export { createRoutes, route };
