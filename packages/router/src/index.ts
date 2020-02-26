import * as t from 'io-ts';
import { createRoutes } from './createRoutes';

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

export { createRoutes };
