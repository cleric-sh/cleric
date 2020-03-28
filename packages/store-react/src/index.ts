import {SliceNode} from '@cleric/store/src/SliceNode';
import {ISliceApi} from '@cleric/store/src/store';
import {StoreNode} from '@cleric/store/src/StoreNode';

import {connect, inject} from './connect';
import {useSinks} from './useSinks';
import {useSources} from './useSources';

export {connect, inject, useSinks, useSources};

declare module '@cleric/store/src/store' {
  export interface ISliceApi<T> {
    $use: () => T;
  }
}

declare module '@cleric/store/src/StoreNode' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface StoreNode {
    $use: (...args: any[]) => any;
  }
}

declare module '@cleric/store/src/SliceNode' {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface SliceNode {
    $use: (...args: any[]) => any;
  }
}

export function $use<T>(this: ISliceApi<T>): T {
  return useSources(this) as T;
}

StoreNode.prototype.$use = $use;
SliceNode.prototype.$use = $use;
