import {SubscribeState} from 'router5';
import {RouteMap} from './';

export const readRouteState = (routeMap: RouteMap, state: SubscribeState) => {
  const names = state.route.name.split('.');
  const top = {};
  let next = top;
  const accName: string[] = [];
  const accPath: string[] = [];
  let accParams = {};
  let accMap = routeMap;

  for (const name of names) {
    const node = accMap[name];
    accName.push(name);
    accPath.push(node.path);

    const params = node.codec ?.decode(state.route.params);
    if (params?._tag == 'Right') {
      accParams = {
        ...accParams,
        ...params.right,
      };
    }

    next[name] = {
      name: accName.join('.'),
      path: accPath.join(''),
      params: accParams,
      state,
    };

    next = next[name];

    if (node.children) accMap = node.children;
  }
  return top;
};
