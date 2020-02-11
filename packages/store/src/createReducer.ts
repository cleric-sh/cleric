import { Subscription, isObservable, Observable, from } from 'rxjs';
import { Slice, SourceProps, SourceArgs, Source } from '@cleric/store/src/store';
import { convertArgsToProps } from '@cleric/store/src/convertArgsToProps';
import { isSource, isSlice, isSubscribable } from './guards';
import { isArrayLike } from 'lodash';
import { DeepPartial } from '@bernie/web/src/tools/deepPartial';

export type ReducerObject<TState> = {
  [P in keyof TState]: Reducer<TState[P]>;
};

export type ReducerFn<TState> = (state: Observable<TState>) => Source<TState>;

export type Reducer<TState> =
  | ReducerFn<TState>
  | Source<TState>
  | ReducerObject<DeepPartial<TState>>;

export type ReducerBuilder<TState, TSourceArgs extends SourceArgs> = (
  state: Slice<TState>,
  sources: SourceProps<TSourceArgs>,
) => Reducer<TState>;

export type ReducerObservables<TState> =
  | Observable<TState>
  | {
      [P in keyof TState]: TState[P] extends Source<infer U>
        ? Observable<U>
        : ReducerObservables<TState[P]>;
    };

export const connectReducer = <TState>(
  slice: Slice<TState>,
  reducer: ReducerObservables<TState>,
): Subscription[] => {
  if (isObservable(reducer)) {
    const subscription = reducer.subscribe(slice.$set);
    return [subscription];
  }

  return Object.getOwnPropertyNames(reducer).reduce<Subscription[]>((subscriptions, name) => {
    const newSubscriptions = connectReducer(slice[name], reducer[name]);
    return subscriptions.concat(newSubscriptions);
  }, []);
};

export const buildSourceInput = <T>(source: Source<T>): Observable<T> => {
  if (isSlice(source)) {
    return source.$;
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

function convertReducerArgsToObservables<TState>(
  slice: Slice<TState>,
  reducer: Reducer<TState>,
): ReducerObservables<TState> {
  let _reducer = reducer;

  if (!_reducer) return;

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
  reducerBuilder: ReducerBuilder<TState, TSourceArgs>,
) => {
  return (slice: Slice<TState>, sources: TSourceArgs): Subscription[] => {
    const sourceObservables = convertArgsToProps(sources);
    // sourceObservables['isMouseOver'].subscribe(v => console.log(v));
    const reducer = reducerBuilder(slice, sourceObservables);
    const reducerObservables = convertReducerArgsToObservables(slice, reducer);
    return connectReducer(slice, reducerObservables);
  };
};
