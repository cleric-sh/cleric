import { HashState } from '@cleric/hash';
import { Utils } from '@cleric/common';
import { Observable, ObservableInput, Subject, Subscribable } from 'rxjs';
import { DeepPartial } from 'utility-types';
import { ReducerBuilder } from './createReducer';

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

  /**
   * Mounts the specified module to this Slice node.
   */
  $mount: <T, TSinkArgs extends SinkArgs>(
    mountableModule: MountableModule<T, TSinkArgs>,
  ) => MountedModule<TSinkArgs>;
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
export type SourceArgsFromShape<TSpec extends Shape> = {
  [P in keyof TSpec]:
    | Source<TSpec[P]>
    | SourceArgsFromShape<TSpec[P] extends Shape ? TSpec[P] : never>;
};

/**
 * An object whose properties are Sources.
 */
export type SourceArgs = {
  [key: string]: Source<unknown> | SourceArgs;
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
export type ShapeFromSourceArgs<TSources extends SourceArgs> = {
  [P in keyof TSources]: TSources[P] extends Source<infer U>
    ? U
    : TSources[P] extends SourceArgs
    ? ShapeFromSourceArgs<TSources[P]>
    : never;
};

export type SourceProps<TSources extends SourceArgs> = {
  [P in keyof TSources]: TSources[P] extends Source<infer U>
    ? Observable<U>
    : SourceProps<TSources[P] extends SourceArgs ? TSources[P] : never>;
};

export type SinkArgs = { [key: string]: Subject<any> | Function };

export type SinkProps<TSinkMap extends SinkArgs> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Subject<infer E>
    ? (payload: E) => void
    : TSinkMap[P] extends (payload: infer E) => any
    ? (payload: E) => void
    : never;
};

export interface ISlice<T> extends ISliceApi<T>, INode {}

type EffectArgs = { [key: string]: Subscribable<any> };

type EffectBuilder<TState, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs> = (
  state: Slice<TState>,
  props: SourceProps<TSourceArgs> & SinkProps<TSinkArgs>,
) => EffectArgs;

export type MountableModule<TState, TSinkMap extends SinkArgs> = (
  slice: Slice<TState>,
) => MountedModule<TSinkMap>;

type SinkExports<TSinkMap extends SinkArgs> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Observable<infer E> ? Observable<E> : never;
};

export type MountedModule<TSinkMap extends SinkArgs> = {
  dispose: () => void;
} & SinkExports<TSinkMap>;

export type ModuleSpec<TState, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs> = {
  sinks?: () => TSinkArgs;
  effects?: EffectBuilder<TState, TSourceArgs, TSinkArgs>;
  reducer?: ReducerBuilder<TState, TSourceArgs>;
};

export type Module<TState, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs> = (
  sources: TSourceArgs,
) => MountableModule<TState, TSinkArgs>;

/**
 * Args = as input, arguments of a function, as seen from outside the function.
 * Props = as output, arguments of a function, as seen from inside the function.
 */
