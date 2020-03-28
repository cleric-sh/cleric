import {get} from 'lodash';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map, shareReplay} from 'rxjs/operators';

import {createMutator} from './createMutator';
import {
  ISlice,
  ISliceApi,
  IStore,
  Module,
  MountedModule,
  Mutator,
  SinkArgs,
  SourceArgs,
  State,
} from './store';

/**
 * A SliceNode observes a child property of a parent node and exposes an API to
 * modify it. It applies set and merge operations, re-calculating hash values as
 * required, ensuring only value-based changes are emitted.
 */
export class SliceNode implements ISliceApi<any> {
  private _state$: Observable<State<any>>;
  public readonly path: string[];

  constructor(private store: IStore<any>, private parent: ISlice<any>,
              name: string) {
    this._state$ = (undefined as any) as Observable<State<any>>;
    this.path = [...parent.path, name ];
  }

  get state$() {
    if (!this._state$) {
      this._state$ = this.parent.state$.pipe(
          map(
              (state):
                  State<any> => {
                    if (!state || !state.current)
                      return (undefined as any) as State<any>;
                    return {
                      current :
                          get(state.current, this.path[this.path.length - 1]),
                      hash : get(state.hash, this.path[this.path.length - 1]),
                    };
                  },
              ),
          distinctUntilChanged(
              (x, y) => x === y,
              state => { return state && state.hash ? state.hash.__hash : 0; },
              ),
          shareReplay(1),
      );
    }
    return this._state$;
  }

  get $() { return this.state$.pipe(map(s => (s ? s.current : undefined))); }

  $set = (state: any) => {
    this.store.mutate([ {path : this.path, state, type : 'SET'} ]);
  };

  $merge = (state: any) => {
    this.store.mutate([ {path : this.path, state, type : 'MERGE'} ]);
  };

  $delete = () => {
    this.store.mutate(
        [ {path : this.path, state : undefined, type : 'DELETE'} ]);
  };

  $batch = (mutationFn: (mutator: Mutator<any>) => void) => {
    const [mutations, mutator] = createMutator();
    mutationFn(mutator);
    this.store.mutate(mutations);
  };

  $mount<T, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
      module: Module<T, TSourceArgs, TSinkArgs>,
      sources: TSourceArgs,
      ): MountedModule<TSinkArgs> {
    const mountableModule = module(sources);
    return mountableModule(this as any) as MountedModule<TSinkArgs>;
  }
}
