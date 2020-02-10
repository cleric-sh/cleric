import { ObservableInput, Subscription, isObservable, Observable } from 'rxjs';
import { Slice, SourceObserables, Sources } from '@cleric/store/src/store';
import { convertSourcesToObservables } from '@cleric/store/src/buildSourceObservables';
import { DeepPartial } from 'utility-types';

type ReducerObject<TState> = {
  [P in keyof TState]: Reducer<TState[P]>;
};

export type Reducer<TState> = ObservableInput<TState> | ReducerObject<TState>;

type ReducerFunction<TState, TSources extends Sources> = (
  state: Slice<TState>,
  sources: SourceObserables<TSources>,
) => Reducer<DeepPartial<TState>>;

export type ReducerObserables<TState> = {
  [P in keyof TState]: TState[P] extends ObservableInput<infer U>
    ? Observable<U>
    : ReducerObserables<TState[P]>;
};

const connectReducer = <TState>(
  slice: Slice<TState>,
  reducer: Reducer<DeepPartial<TState>>,
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

export const createReducer = <TState, TSources extends Sources>(
  reducerFunction: ReducerFunction<TState, TSources>,
) => {
  return (slice: Slice<TState>, sources: TSources) => {
    const sourceObservables = convertSourcesToObservables(sources);
    const reducer = reducerFunction(slice, sourceObservables);
    const reducerObservables = convertSourcesToObservables(reducer);

    return connectReducer(slice, reducerObservables);
  };
};
