import { SubscribeState } from 'router5';
import { IRouteMap, Routes, IRouteNode } from './index';
import { Mutator } from '@cleric/store/src/store';
import { get } from 'lodash';

const walkRoutes = (
  routeMap: IRouteMap,
  name: string,
  atNode: (node: IRouteNode<any, any>, path: string[]) => void,
) => {
  const prevNames = name.split('.');

  for (let i = 0; i < prevNames.length; i++) {
    const path = prevNames.filter((v, k) => k <= i);

    const [first, ...rest] = path;
    let node = routeMap[first];

    for (const prop of rest) {
      node = node['children'][prop];
    }

    atNode(node, path);
  }
};

export const readRouteState = <TRouteMap extends IRouteMap>(
  routeMap: IRouteMap,
  store: Mutator<Routes<TRouteMap>>,
  state: SubscribeState,
) => {
  // Reset previous route state.
  if (state.previousRoute) {
    walkRoutes(routeMap, state.previousRoute.name, (node, path) => {
      const codec = node.codec;

      if (codec) {
        const params = codec.decode(state.previousRoute.params);

        if (params._tag == 'Right') {
          get(store, [...path, 'params']).$delete();
        }
      }

      get(store, [...path, 'activated']).$set(false);
    });
  }

  walkRoutes(routeMap, state.route.name, (node, path) => {
    const codec = node.codec;

    if (codec) {
      const params = codec.decode(state.route.params);

      if (params._tag == 'Right') {
        get(store, [...path, 'params']).$set(params.right);
      }
    }

    get(store, [...path, 'activated']).$set(true);
  });
};
