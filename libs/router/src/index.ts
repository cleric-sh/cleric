import * as t from 'io-ts';
import {Union} from 'ts-toolbelt';

import {OnlyKnown} from '@cleric/common/src/types/types';
import {createRoutes} from './createRoutes';
import {RouteArgs, RoutesArgs, route} from './route';

export type RouteNode<TProps extends t.Props> = Omit<
  RouteArgs<TProps>,
  'type' | 'children'
> & {
  children?: RouteMap;
  codec?: t.ExactC<t.TypeC<TProps>>;
};

export type RouteMap<TProps extends t.Props = {}> = {
  [key: string]: RouteNode<TProps>;
};

type RouteParams<TParams extends t.Props = {}> = {} extends TParams
  ? {}
  : {params: t.TypeOfProps<TParams>};

type RouteProps = {
  name: string;
  path: string;
};

export type RoutesState<
  TRoutesArgs extends RoutesArgs,
  TLastProps extends t.Props = {}
> = {
  [P in keyof TRoutesArgs]: TRoutesArgs[P] extends RouteArgs<infer U>
    ? Union.Strict<
        RouteProps &
          RouteParams<Union.Strict<TLastProps & OnlyKnown<U>>> &
          RoutesState<
            NonNullable<TRoutesArgs[P]['children']>,
            Union.Strict<TLastProps & OnlyKnown<U>>
          >
      >
    : never;
};

export {createRoutes, route};
