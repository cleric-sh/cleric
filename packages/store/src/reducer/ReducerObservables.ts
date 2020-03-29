import {Observable} from 'rxjs';
import {Source} from '../store';

export type ReducerObservables<TState> =
  | Observable<TState>
  | {
      [P in keyof TState]: TState[P] extends Source<infer U>
        ? Observable<U>
        : ReducerObservables<TState[P]>;
    };
