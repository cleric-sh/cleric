import { createRouter, SubscribeState, Route } from 'router5';
import { from, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertRouteMapToRoutes } from './convertRouteMapToRoutes';
import { convertRouteMapToInitialState } from './convertRouteMapToInitialState';
import { readRouteState } from './readRouteState';
import * as t from 'io-ts';

export type IRouteNode<TProps extends t.Props, TChildren extends IRouteMap> = {
  path: string;
  codec?: t.ExactC<t.TypeC<TProps>>;
  children?: TChildren;
};

export type IRouteMap = {
  [name: string]: IRouteNode<any, any>;
};

export interface IRouteState<TParams> {
  activated: boolean;
  params?: TParams;
}

type TypeOfProps<TProps extends t.ExactC<t.TypeC<t.Props>> | undefined> = TProps extends undefined
  ? undefined
  : t.TypeOf<NonNullable<TProps>>;

export type Routes<T extends IRouteMap> = {
  [P in keyof T]: T[P]['children'] extends never
    ? IRouteState<TypeOfProps<T[P]['codec']>>
    : Routes<NonNullable<T[P]['children']>> & IRouteState<TypeOfProps<T[P]['codec']>>;
};

const createRoutes = <TRouteMap extends IRouteMap>(routeMap: TRouteMap) => {
  const routes: Route[] = convertRouteMapToRoutes(routeMap);
  const initial: Routes<TRouteMap> = convertRouteMapToInitialState(routeMap);
  const router = createRouter(routes);

  return from((router as any) as Subscribable<SubscribeState>).pipe(
    map(state => readRouteState(routeMap, initial, state)),
  );
};

interface IMyParams {
  blah: string;
}

export const route = <TProps extends t.Props>(props?: TProps) => <
  TChildren extends IRouteMap = {}
>(
  path: string,
  children?: TChildren,
): IRouteNode<TProps, TChildren> => ({
  path,
  codec: props ? t.exact(t.type(props)) : undefined,
  children,
});

const MyParams = {
  blah: t.string,
};

const routes$ = createRoutes({
  LOGIN: route(MyParams)('/login', {
    REGISTER: route()('/register', {
      SUBMITTED: route({ id: t.string })('/submitted'),
      CANCELLED: route()('/cancelled'),
    }),
  }),
});

// routes({}).LOGIN.REGISTER;
// routes({}).LOGIN.REGISTER.SUBMITTED.params;
