import { HashState } from '@cleric/hash';
import { Utils } from '@cleric/common';
import { Observable, ObservableInput, Subject, Subscribable } from 'rxjs';
import { DeepPartial } from 'utility-types';

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
  $merge: (value: DeepPartial<T>) => void;

  /**
   * Deletes the value at the specified node, removing its reference from the parent node.
   */
  $delete: () => void;

  // /**
  //  * Mounts the specified module to this Slice node.
  //  */
  // $mount: <T, TSinkMap extends SinkMap>(
  //   mountableModule: ConnectedModule<T, TSinkMap>,
  // ) => MountedModule<TSinkMap>;
}

/**
 * A single-value observable input source.
 * Any store node, or construct compatible with ObservableInput is valid here.
 * This includes iterators, promises, arrays and observable-like objects.
 *
 * This Type excludes Subscribable<never>, which exists on ObservableInput,
 * because it acts as a catch all on the type of the Source's values, and
 * prevents Typescript from emitting errors when the source's values don't match.
 */
export type Source<T> = Exclude<ISliceApi<T> | ObservableInput<T>, Subscribable<never>>;

/**
 * An object that is used to specify the shape of related objects.
 * E.g. props, sources, sinks.
 *
 * Making the values of each key unknown forces TS to enforce
 * type assertion before using them. This allows TS to resolve
 * values properly in other types that use Shape.
 */
export type Shape = { [key: string]: unknown };

/**
 * An object whose properties are Sources that, when combined, must form the Shape
 * specified by TShape.
 *
 * E.g.
 * {
 *  one: string;
 *  two: number;
 *  three: {
 *    four: boolean;
 *  }
 * }
 *
 * Becomes:
 * {
 *  one: Source<string>;
 *  two: Source<number>;
 *  three: Source<{ four: boolean }> | {
 *    four: Source<boolean>
 *  }
 * }
 */
export type SourcesFromShape<TSpec extends Shape> = {
  [P in keyof TSpec]:
    | Source<TSpec[P]>
    | SourcesFromShape<TSpec[P] extends Shape ? TSpec[P] : never>;
};

/**
 * An object whose properties are Sources.
 */
export type Sources = {
  [key: string]: Source<unknown> | Sources;
};

/**
 * Given a Sources type, returns the Shape of the value of the
 * Observable that would be produced if all Sources were
 * combined and reduced to the root type. E.g.
 * {
 *  one: Observable<string>;
 *  two: [1,2,3];
 *  three: Observable<{ four: boolean }> | {
 *    four: Promise<boolean>
 *  }
 * }
 * Becomes:
 * {
 *  one: string;
 *  two: number;
 *  three: {
 *    four: boolean;
 *  }
 * }
 */
export type ShapeFromSources<TSources extends Sources> = {
  [P in keyof TSources]: TSources[P] extends Source<infer U>
    ? U
    : TSources[P] extends Sources
    ? ShapeFromSources<TSources[P]>
    : never;
};

export type SourceObserables<TSources extends Sources> = {
  [P in keyof TSources]: TSources[P] extends Source<infer U>
    ? Observable<U>
    : SourceObserables<TSources[P] extends Sources ? TSources[P] : never>;
};

export type SinkMap = { [key: string]: Subject<any> | Function };

export type SinkProps<TSinkMap extends SinkMap> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Subject<infer E>
    ? (payload: E) => void
    : TSinkMap[P] extends (payload: infer E) => any
    ? (payload: E) => void
    : never;
};

export interface ISlice<T> extends ISliceApi<T>, INode {}

// type EffectMap = { [key: string]: Subscribable<any> };

// type EffectBuilder<TState, TSourceSpec extends SourceSpec, TSinkMap extends SinkMap> = (
//   props: SourceObservables<TSourceSpec> & SinkProps<TSinkMap>,
//   state: Slice<TState>,
// ) => EffectMap;

// export type ConnectedModule<TState, TSinkMap extends SinkMap> = (
//   slice: Slice<TState>,
// ) => MountedModule<TSinkMap>;

// type SinkExports<TSinkMap extends SinkMap> = {
//   [P in keyof TSinkMap]: TSinkMap[P] extends Observable<infer E> ? Observable<E> : never;
// };

// export type MountedModule<TSinkMap extends SinkMap> = {
//   dispose: () => void;
// } & SinkExports<TSinkMap>;

// export type ModuleSpec<TState, TSourceMap extends SourceSpec, TSinkMap extends SinkMap> = {
//   sinks?: () => TSinkMap;
//   effects: EffectBuilder<TState, TSourceMap, TSinkMap>;
// };

// export type Module<TState, TSourceSpec extends SourceSpec, TSinkMap extends SinkMap> = (
//   sources: Sources<TSourceSpec>,
// ) => ConnectedModule<TState, TSinkMap>;
