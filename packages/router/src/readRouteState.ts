import { SubscribeState } from 'router5';
import { IRouteMap, Routes } from './index';
import { set } from 'monolite';

export const readRouteState = <TRouteMap extends IRouteMap>(
  routeMap: IRouteMap,
  initial: Routes<TRouteMap>,
  state: SubscribeState,
) => {
  const names = state.route.name.split('.');
  let out = initial;
  for (let i = 0; i < names.length; i++) {
    const path = names.filter((v, k) => k <= i);

    const [first, ...rest] = path;
    let map = routeMap[first];

    for (const prop of rest) {
      map = map['children'][prop];
    }
    const codec = map.codec;

    if (codec) {
      const params = codec.decode(state.route.params);
      if (params._tag == 'Right') {
        out = set(out, [...path, 'params'], params.right);
      }
    }

    out = set(out, [...path, 'activated'], true);
  }
  return out;
};
