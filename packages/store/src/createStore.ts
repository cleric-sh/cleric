import {SliceNode} from './SliceNode';
import {SliceI, StoreI, Store} from './store';
import {StoreNode} from './StoreNode';

// Todo: Refactor this to take an io-ts schema instead.
// Remove the use of proxies (ES5, yaye!).
// Proxies don't play nice when dynamic code runs on the store, e.g.
// expect(store) causes jest tests to hang, presumably because it's calling
// properties that don't exist and returning proxies.

const reserved = [
  'Array',
  'Date',
  'eval',
  'function',
  'hasOwnProperty',
  'Infinity',
  'isFinite',
  'isNaN',
  'isPrototypeOf',
  'length',
  'Math',
  'NaN',
  'name',
  'Number',
  'Object',
  'prototype',
  'String',
  'toString',
  'undefined',
  'valueOf',
];

const isValidProperty = (key: string | number | symbol) => {
  if (typeof key === 'symbol') return false;
  if (typeof key === 'number') return true;
  const isReserved = reserved.includes(key);
  return !isReserved;
};

/**
 * Initialize a proxy node that creates SliceNodes for each property that's
 * invoked from Store.
 * @param node
 */
const createProxy = (store: StoreI<any>, node: SliceI<any>) => {
  return new Proxy(node, {
    get: (target, key, receiver) => {
      if (!Reflect.has(target, key) && isValidProperty(key)) {
        console.log(key);
        const name = key.toString();
        const proxy = createProxy(store, new SliceNode(store, target, name));
        Reflect.set(target, key, proxy, receiver);
      }
      return Reflect.get(target, key, receiver);
    },
  });
};

/**
 * Initializes a new Store for the Type specified, optionally accepting an
 * initialState. If initialState is not provided, initialState will be
 * undefined.
 * @param initialState
 */
export const createStore = <T>(initialState?: T): Store<T> => {
  const root = new StoreNode(initialState);
  const store = createProxy(root, root);
  return (store as any) as Store<T>;
};
