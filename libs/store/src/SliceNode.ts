import {get} from 'lodash';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, shareReplay} from 'rxjs/operators';

import {createMutator} from './createMutator';
import {
  Module,
  MountedModule,
  Mutator,
  SinkArgs,
  SliceApiI,
  SliceI,
  SourceArgs,
  State,
  StoreI,
} from './store';

/**
 * A SliceNode observes a child property of a parent node and exposes an API to
 * modify it. It applies set and merge operations, re-calculating hash values as
 * required, ensuring only value-based changes are emitted.
 */
export class SliceNode implements SliceApiI<unknown> {
  private _state$: Observable<State<unknown>>;
  public readonly path: string[];

  constructor(
    private store: StoreI<unknown>,
    private parent: SliceI<unknown>,
    name: string
  ) {
    this._state$ = (undefined as unknown) as Observable<State<unknown>>;
    this.path = [...parent.path, name];
  }

  get state$() {
    if (!this._state$) {
      this._state$ = this.parent.state$.pipe(
        map(
          (state): State<unknown> => {
            if (!state || !state.current)
              return (undefined as unknown) as State<unknown>;
            return {
              current: get(state.current, this.path[this.path.length - 1]),
              hash: get(state.hash, this.path[this.path.length - 1]),
            };
          }
        ),
        distinctUntilChanged(
          (x, y) => x === y,
          state => {
            return state && state.hash ? state.hash.__hash : 0;
          }
        ),
        shareReplay(1)
      );
    }
    return this._state$;
  }

  get $() {
    return this.state$.pipe(map(s => (s ? s.current : undefined)));
  }

  $set = (state: unknown) => {
    this.store.mutate([{path: this.path, state, type: 'SET'}]);
  };

  $merge = (state: unknown) => {
    this.store.mutate([{path: this.path, state, type: 'MERGE'}]);
  };

  $delete = () => {
    this.store.mutate([{path: this.path, state: undefined, type: 'DELETE'}]);
  };

  $batch = (mutationFn: (mutator: Mutator<unknown>) => void) => {
    const [mutations, mutator] = createMutator();
    mutationFn(mutator);
    this.store.mutate(mutations);
  };

  $mount<T, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
    module: Module<T, TSourceArgs, TSinkArgs>,
    sources: TSourceArgs
  ): MountedModule<TSinkArgs> {
    const mountableModule = module(sources);
    return mountableModule(this as any) as MountedModule<TSinkArgs>;
  }
}
