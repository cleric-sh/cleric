import { buildSourceInput } from './buildSourceInput';
import { Source, SourceObserables, Sources } from './store';
import { isSource } from './guards';
import { Observable } from 'rxjs';
import { Reducer, ReducerObserables } from './createReducer';

export function convertSourcesToObservables<T>(source: Source<T>): Observable<T>;
export function convertSourcesToObservables<TSources extends Sources>(
  sources: TSources,
): SourceObserables<TSources>;
export function convertSourcesToObservables<TState>(
  reducer: Reducer<TState>,
): ReducerObserables<TState>;
export function convertSourcesToObservables(input: any) {
  if (isSource(input)) {
    return buildSourceInput(input);
  }

  return Object.getOwnPropertyNames(input).reduce((props, name) => {
    const source = input[name];
    props[name] = convertSourcesToObservables(source as any);
    return props;
  }, {});
}

// export const buildSourceSubscribables = <TSourceShape extends Shape>(
//   sources: Source<TSourceShape> | SourcesFromShape<TSourceShape>,
// ) => {
//   if (isSource(sources)) {
//     return buildSourceInput(sources);
//   }
//   return Object.getOwnPropertyNames(sources).reduce((props, name) => {
//     const source = sources[name];
//     props[name] = buildSourceSubscribables(source as any);
//     return props;
//   }, {}) as SourceSubscribables<TSourceShape>;
// };
