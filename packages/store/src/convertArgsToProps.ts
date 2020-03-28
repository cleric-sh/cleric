import {Observable} from 'rxjs';

import {buildSourceInput} from './buildSourceInput';
import {Reducer, ReducerObservables} from './createReducer';
import {isSource} from './guards';
import {Source, SourceArgs, SourceProps} from './store';

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
