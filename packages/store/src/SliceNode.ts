import { map, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { get } from 'lodash';
import {
  ISliceApi,
  State,
  IStore,
  ISlice,
  SinkArgs,
  MountedModule,
  SourceArgs,
  Module,
} from './store';
import { Observable } from 'rxjs';

/**
 * A SliceNode observes a child property of a parent node and exposes an API to modify it.
 * It applies set and merge operations, re-calculating hash values as required, ensuring only value-based changes are emitted.
 */
export class SliceNode implements ISliceApi<any> {
  private _state$: Observable<State<any>>;
  public readonly path: string[];

  constructor(private store: IStore<any>, private parent: ISlice<any>, name: string) {
    this._state$ = (undefined as any) as Observable<State<any>>;
    this.path = [...parent.path, name];
  }

  get state$() {
    if (!this._state$) {
      this._state$ = this.parent.state$.pipe(
        map(
          (state): State<any> => {
            if (!state || !state.current) return (undefined as any) as State<any>;
            return {
              current: get(state.current, this.path[this.path.length - 1]),
              hash: get(state.hash, this.path[this.path.length - 1]),
            };
          },
        ),
        distinctUntilChanged(
          (x, y) => x === y,
          state => {
            return state && state.hash ? state.hash.__hash : 0;
          },
        ),
        shareReplay(1),
      );
    }
    return this._state$;
  }

  get $() {
    return this.state$.pipe(map(s => (s ? s.current : undefined)));
  }

  $set = (state: any) => {
    this.store.mutate(this.path, state, 'SET');
  };

  $merge = (state: any) => {
    this.store.mutate(this.path, state, 'MERGE');
  };

  $delete = () => {
    this.store.mutate(this.path, undefined, 'DELETE');
  };

  $mount<T, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
    module: Module<T, TSourceArgs, TSinkArgs>,
    sources: TSourceArgs,
  ): MountedModule<TSinkArgs> {
    const mountableModule = module(sources);
    return mountableModule(this as any) as MountedModule<TSinkArgs>;
  }
}
