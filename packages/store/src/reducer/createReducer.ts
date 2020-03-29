import {isArrayLike} from 'lodash';
import {from, isObservable, Observable, Subscription} from 'rxjs';

import {convertArgsToProps} from '../convertArgsToProps';
import {isSlice, isSource, isSubscribable} from '../guards';
import {Slice, Source, SourceArgs, SourceProps} from '../store';
import {ReducerObservables} from './ReducerObservables';

export type ReducerObject<TState> = {
  [P in keyof TState]?: Reducer<TState[P]>;
};

export type ReducerFn<TState> = (state: Observable<TState>) => Source<TState>;

export type Reducer<TState> =
  | ReducerFn<TState>
  | Source<TState>
  | ReducerObject<TState>;

export type ReducerBuilder<TState, TSourceArgs extends SourceArgs> = (
  sources: SourceProps<TSourceArgs>,
  state: Slice<TState>
) => Reducer<TState>;

export const connectReducer = <TState>(
  slice: Slice<TState>,
  reducer: ReducerObservables<TState>
): Subscription[] => {
  if (isObservable(reducer)) {
    const subscription = reducer.subscribe(slice.$set);
    return [subscription];
  }

  return Object.getOwnPropertyNames(reducer).reduce<Subscription[]>(
    (subscriptions, name) => {
      const newSubscriptions = connectReducer(slice[name], reducer[name]);
      return subscriptions.concat(newSubscriptions);
    },
    []
  );
};

export const buildSourceInput = <T>(source: Source<T>): Observable<T> => {
  if (isSlice(source)) {
    return source.$ as Observable<T>;
  }

  if (isSubscribable(source)) {
    return (source as unknown) as Observable<T>;
  }

  if (isArrayLike(source)) {
    return from(source);
  }

  throw `Param 'source' is not a valid Source type.`;
};

const isReducerFn = <T>(reducer: Reducer<T>): reducer is ReducerFn<T> =>
  typeof reducer === 'function';

export function convertReducerArgsToObservables<TState>(
  slice: Slice<TState>,
  reducer: Reducer<TState>
): ReducerObservables<TState> {
  let _reducer = reducer;

  if (isReducerFn(_reducer)) {
    _reducer = _reducer(slice.$);
  }

  if (isSource(_reducer)) {
    return buildSourceInput(_reducer);
  }

  return (Object.getOwnPropertyNames(_reducer).reduce((props, name) => {
    props[name] = convertReducerArgsToObservables(slice[name], _reducer[name]);
    return props;
  }, {}) as unknown) as ReducerObservables<TState>;
}

export const createReducer = <TState, TSourceArgs extends SourceArgs>(
  reducerBuilder: ReducerBuilder<TState, TSourceArgs>
) => {
  return (slice: Slice<TState>, sources: TSourceArgs): Subscription[] => {
    const sourceObservables = convertArgsToProps(sources);
    const reducer = reducerBuilder(sourceObservables, slice);
    const reducerObservables = convertReducerArgsToObservables(slice, reducer);
    return connectReducer(slice, reducerObservables);
  };
};
