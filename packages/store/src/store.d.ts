import { HashState } from '@cleric/hash';
import { Utils } from '@cleric/common';
import { Observable, ObservableInput, Subject, Subscribable } from 'rxjs';

/**
 * The (serializable) type of the underlying state that also tracks the state's corresponding hash tree.
 */
export type State<T> = {
  current: T;
  hash: HashState<T>;
};

export type MutationType = 'DELETE' | 'MERGE' | 'SET';

export type Mutation = {
  path: string[];
  state: any;
  type: MutationType;
};

/**
 * Implements functionality that nodes in the store graph have exposed to eachother.
 * These implementations are used to communicate between nodes and interact as necessary.
 */
export interface INode {
  state$: Observable<State<any>>;
  path: string[];
}

/**
 * Provides the API for interacting with a Store based on a specified state's Type.
 */
export type Store<T, TValid = Utils.FilterExclude<T, Function>> = IStoreApi<T> &
  {
    [P in keyof TValid]: TValid[P] extends object ? Slice<TValid[P]> : ISliceApi<TValid[P]>;
  };

/**
 * Public functionality exposed by the root Store node.
 */
export interface IStoreApi<T> extends ISliceApi<T> {
  /**
   * Disposes the Store, completing all observers and closing all dependent subscriptions.
   */
  $dispose();
}

export interface IStore<T> extends IStoreApi<T>, INode {
  mutate(path: string[], state: any, type: MutationType);
}

/**
 * Provides the API for interacting with a Store based on a specified state's Type at a particular slice of the store.
 */
export type Slice<T, TValid = Utils.FilterExclude<T, Function>> = ISliceApi<T> &
  {
    [P in keyof TValid]: TValid[P] extends object ? Slice<TValid[P]> : ISliceApi<TValid[P]>;
  };

/**
 * Public functionality exposed by each slice node (including the root Store node)
 */
export interface ISliceApi<T> {
  //   $current: T;

  //   $hash: HashState<T>;

  /**
   * Returns an observable of this Slice node's state.
   */
  $: Observable<T>;

  /**
   * Sets the value of this Slice node's state.
   */
  $set: (value: T) => void;

  /**
   * Merges the value specified into this Slice node's state.
   */
  $merge: (value: Utils.DeepPartial<T>) => void;

  /**
   * Deletes the value at the specified node, removing its reference from the parent node.
   */
  $delete: () => void;

  /**
   * Mounts the specified module to this Slice node.
   */
  $mount: <T, TSinkMap extends SinkMap>(
    mountableModule: ConnectedModule<T, TSinkMap>,
  ) => MountedModule<TSinkMap>;
}

export type SourceInput<T> = ISliceApi<T> | ObservableInput<T>;

export type SourceSpec = { [key: string]: any };

export type SourceMap<TSourceMap> = {
  [P in keyof TSourceMap]: SourceInput<TSourceMap[P]>;
};

export type SourceProps<TSourceSpec extends SourceSpec> = {
  [P in keyof TSourceSpec]: Observable<TSourceSpec[P]>;
};

export type SourceProps$<TSourceMap extends SourceMap<SourceSpec>> = Observable<
  {
    [P in keyof TSourceMap]: TSourceMap[P] extends SourceInput<infer U> ? U : never;
  }
>;

export type SinkMap = { [key: string]: Subject<any> };

export type SinkProps<TSinkMap extends SinkMap> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Subject<infer E> ? (payload: E) => void : never;
};

export interface ISlice<T> extends ISliceApi<T>, INode {}

type EffectMap = { [key: string]: Subscribable<any> };

type EffectBuilder<TState, TSourceSpec extends SourceSpec, TSinkMap extends SinkMap> = (
  props: SourceProps<TSourceSpec> & SinkProps<TSinkMap>,
  state: Slice<TState>,
) => EffectMap;

export type ConnectedModule<TState, TSinkMap extends SinkMap> = (
  slice: Slice<TState>,
) => MountedModule<TSinkMap>;

type SinkExports<TSinkMap extends SinkMap> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Observable<infer E> ? Observable<E> : never;
};

export type MountedModule<TSinkMap extends SinkMap> = {
  dispose: () => void;
} & SinkExports<TSinkMap>;

type ModuleSpec<TState, TSourceMap extends SourceSpec, TSinkMap extends SinkMap> = {
  sinks?: () => TSinkMap;
  effects: EffectBuilder<TState, TSourceMap, TSinkMap>;
};

export type Module<TState, TSourceSpec extends SourceSpec, TSinkMap extends SinkMap> = (
  sources: SourceMap<TSourceSpec>,
) => ConnectedModule<TState, TSinkMap>;
