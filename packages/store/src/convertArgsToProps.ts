import { buildSourceInput } from './buildSourceInput';
import { Source, SourceProps, SourceArgs } from './store';
import { isSource } from './guards';
import { Observable } from 'rxjs';
import { Reducer, ReducerObservables } from './createReducer';

export function convertArgsToProps<T>(source: Source<T>): Observable<T>;
export function convertArgsToProps<TSources extends SourceArgs>(
  sources: TSources,
): SourceProps<TSources>;
export function convertArgsToProps<TState>(reducer: Reducer<TState>): ReducerObservables<TState>;
export function convertArgsToProps(input: any) {
  if (isSource(input)) {
    return buildSourceInput(input);
  }

  return Object.getOwnPropertyNames(input).reduce((props, name) => {
    const source = input[name];
    props[name] = convertArgsToProps(source as any);
    return props;
  }, {});
}
