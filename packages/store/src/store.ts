import {Types} from '@cleric/common';
import {HashState} from '@cleric/hash';
import {Observable, ObservableInput, Subject, Subscribable} from 'rxjs';
import {DeepPartial} from 'utility-types';

import {Compute} from 'Any/_api';
import {ReducerBuilder} from './reducer/createReducer';

/**
 * The (serializable) type of the underlying state that also tracks the state's
 * corresponding hash tree.
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
 * Implements functionality that nodes in the store graph have exposed to
 * eachother. These implementations are used to communicate between nodes and
 * interact as necessary.
 */
export interface NodeI {
  path: string[];
  state$: Observable<State<any>>;
}

type Valid<T> = Types.FilterExclude<T, Function>;

/**
 * Provides the API for interacting with a Store based on a specified state's
 * Type.
 */
export type Store<T> = Compute<
  StoreApiI<T> &
    {
      [P in keyof Valid<T>]-?: Valid<T>[P] extends object
        ? Slice<Valid<T>[P]>
        : SliceApiI<Valid<T>[P]>;
    }
>;

/**
 * Public functionality exposed by the root Store node.
 */
export interface StoreApiI<T> extends SliceApiI<T> {
  /**
   * Disposes the Store, completing all observers and closing all dependent
   * subscriptions.
   */
  $dispose(): void;
}

export interface StoreI<T> extends StoreApiI<T>, NodeI {
  mutate(mutations: Mutation[]): void;
}

/**
 * Provides the API for interacting with a Store based on a specified state's
 * Type at a particular slice of the store.
 */
export type Slice<T> = SliceApiI<T> &
  {
    [P in keyof Types.FilterExclude<T, Function>]-?: Types.FilterExclude<
      T,
      Function
    >[P] extends object
      ? Slice<Types.FilterExclude<T, Function>[P]>
      : SliceApiI<Types.FilterExclude<T, Function>[P]>;
  };

export type Mutator<T> = MutationApiI<T> &
  {
    [P in keyof T]: Mutator<T[P]>;
  };

export interface MutationApiI<T> {
  /**
   * Sets the value of this Slice node's state.
   */
  $set: (value: T) => void;

  /**
   * Merges the value specified into this Slice node's state.
   */
  $merge: (value: DeepPartial<T>) => void;

  /**
   * Deletes the value at the specified node, removing its reference from the
   * parent node.
   */
  $delete: () => void;
}

/**
 * Public functionality exposed by each slice node (including the root Store
 * node)
 */
export interface SliceApiI<T> extends MutationApiI<T> {
  //   $current: T;

  //   $hash: HashState<T>;

  /**
   * Returns an observable of this Slice node's state.
   */
  $: Observable<T>;

  $batch: (mutationFn: (mutator: Mutator<T>) => void) => void;

  /**
   * Mounts the specified module to this Slice node.
   */
  $mount: <TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
    module: Module<T, TSourceArgs, TSinkArgs>,
    sources: TSourceArgs
  ) => MountedModule<TSinkArgs>;
}

export type AsyncFunction<T> = {
  (): PromiseLike<T>;
};

/**
 * A single-value observable input source.
 * Any store node, or construct compatible with ObservableInput is valid here.
 * This includes iterators, promises, arrays and observable-like objects.
 *
 * This Type excludes Subscribable<never>, which exists on ObservableInput,
 * because it acts as a catch all on the type of the Source's values, and
 * prevents Typescript from emitting errors when the source's values don't
 * match.
 */
export type Source<T> =
  | AsyncFunction<T>
  | Exclude<ObservableInput<T>, Subscribable<never>>
  | SliceApiI<T>;

/**
 * An object that is used to specify the shape of related objects.
 * E.g. props, sources, sinks.
 *
 * Making the values of each key unknown forces TS to enforce
 * type assertion before using them. This allows TS to resolve
 * values properly in other types that use Shape.
 */
export type Shape = {
  [key: string]: unknown;
};

/**
 * An object whose properties are Sources that, when combined, must form the
 * Shape specified by TShape.
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
export type SourceArgs =
  | Source<any>
  | {
      [key: string]: Source<any> | SourceArgs | undefined;
    };

export type SourceProps<TSources extends SourceArgs> = {
  [P in keyof TSources]: TSources[P] extends Source<infer U>
    ? Observable<U>
    : SourceProps<TSources[P] extends SourceArgs ? TSources[P] : never>;
};

export type SinkArgs = {
  [key: string]: Subject<any> | Function;
};

export type SinkProps<TSinkMap extends SinkArgs> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Subject<infer E>
    ? (payload: E) => void
    : TSinkMap[P] extends (payload: infer E) => any
    ? (payload: E) => void
    : never;
};

export interface SliceI<T> extends SliceApiI<T>, NodeI {}

type EffectArgs = {
  [key: string]: Subscribable<any>;
};

type EffectBuilder<
  TState,
  TSourceArgs extends SourceArgs,
  TSinkArgs extends SinkArgs
> = (
  props: SinkProps<TSinkArgs> & SourceProps<TSourceArgs>,
  state: Slice<TState>
) => EffectArgs;

export type MountableModule<TState, TSinkMap extends SinkArgs> = (
  slice: Slice<TState>
) => MountedModule<TSinkMap>;

type SinkExports<TSinkMap extends SinkArgs> = {
  [P in keyof TSinkMap]: TSinkMap[P] extends Observable<infer E>
    ? Observable<E>
    : never;
};

export type MountedModule<TSinkMap extends SinkArgs> = SinkExports<TSinkMap> & {
  dispose: () => void;
};

export type ModuleSpec<
  TState,
  TSourceArgs extends SourceArgs,
  TSinkArgs extends SinkArgs
> = {
  effects?: EffectBuilder<TState, TSourceArgs, TSinkArgs>;
  reducer?: ReducerBuilder<TState, TSourceArgs>;
  sinks?: () => TSinkArgs;
};

export type Module<
  TState,
  TSourceArgs extends SourceArgs,
  TSinkArgs extends SinkArgs
> = (sources: TSourceArgs) => MountableModule<TState, TSinkArgs>;

/**
 * Args = as input, arguments of a function, as seen from outside the function.
 * Props = as output, arguments of a function, as seen from inside the function.
 */
