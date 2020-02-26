import { IRouteMap, IRouteNode } from './index';
import * as t from 'io-ts';

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
