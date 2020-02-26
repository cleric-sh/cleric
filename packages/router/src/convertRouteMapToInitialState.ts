import { IRouteMap, Routes, IRouteState, IRouteNode } from '.';
import { Props } from 'io-ts';

const createRouteState = (): IRouteState<any> => ({
  activated: false,
});

const readRouteNode = (node: IRouteNode<Props, {}>) => {
  const state = createRouteState();
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const map = node.children ? convertRouteMapToInitialState(node.children) : {};
  return { ...state, ...map };
};

export const convertRouteMapToInitialState = <TRouteMap extends IRouteMap>(
  routeMap: IRouteMap,
): Routes<TRouteMap> => {
  const acc = {};
  for (const name in routeMap) {
    acc[name] = readRouteNode(routeMap[name]);
  }
  return (acc as unknown) as Routes<TRouteMap>;
};
