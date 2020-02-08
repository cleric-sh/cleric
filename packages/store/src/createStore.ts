import { StoreNode } from './StoreNode';
import { SliceNode } from './SliceNode';
import { IStore, Store, ISlice } from './store';

/**
 * Initialize a proxy node that creates SliceNodes for each property that's invoked from Store.
 * @param node
 */
const createProxy = (store: IStore<any>, node: ISlice<any>) => {
  return new Proxy(node, {
    get: (target, key, receiver) => {
      if (!Reflect.has(target, key)) {
        const name = key.toString();
        const proxy = createProxy(store, new SliceNode(store, target, name));
        Reflect.set(target, key, proxy, receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  });
};

/**
 * Initializes a new Store for the Type specified, optionally accepting an initialState.
 * If initialState is not provided, initialState will be undefined.
 * @param initialState
 */
export const createStore = <T>(initialState?: T): Store<T> => {
  const root = new StoreNode(initialState);
  const store = createProxy(root, root);
  return (store as any) as Store<T>;
};
