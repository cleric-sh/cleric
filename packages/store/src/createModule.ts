import { Observable, ObservableInput } from 'rxjs';
import { Shape, Slice, SourceObservables, SourcesFromShape } from '@cleric/store/src/store';
import { buildSourceObservables } from '@cleric/store/src/buildSourceObservables';
import { DeepPartial } from 'utility-types';

type ReducerNode<TState> = {
  [P in keyof TState]: TState[P] extends Shape
    ? ObservableInput<TState[P]> | ReducerNode<TState[P]>
    : ObservableInput<TState[P]>;
};

type Reducer<TState, TSources extends SourceObservables<Shape>> = (
  state: Slice<TState>,
  sources: TSources,
) => ObservableInput<DeepPartial<TState>> | ReducerNode<DeepPartial<TState>>;

export const createModule = <TState, TSourceShape extends Shape>(
  reducer: Reducer<TState, SourceObservables<TSourceShape>>,
) => {
  return (slice: Slice<TState>, sources: SourcesFromShape<TSourceShape>) => {
    const sourceObservables = buildSourceObservables(sources);
  };
};

// Todo: If this works, remove SourceSpec.
// Todo: Make mapSourcesToProps recursive, to reduce a tree of observables to a single observable.
