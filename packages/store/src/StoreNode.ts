import { startWith, scan, distinctUntilChanged, publishReplay, map } from 'rxjs/operators';
import { applyMerge } from './applyMerge';
import { applySet } from './applySet';
import {
  IStore,
  SinkArgs,
  MountedModule,
  State,
  Mutation,
  MutationType,
  SourceArgs,
  Module,
} from './store';
import { applyDelete } from './applyDelete';
import { createState } from './createState';
import { Subject, Observable, Subscription, ConnectableObservable, OperatorFunction } from 'rxjs';

/**
 * A StoreNode is the root wrapper for the current state, allowing slices to be created for any path of properties within its state.
 * It applies set and merge operations, re-calculating hash values as required, ensuring only value-based changes are emitted.
 */

export class StoreNode implements IStore<any> {
  private mutations = new Subject<Mutation>();
  public state$: Observable<State<any>>;
  private subscription: Subscription;
  public readonly path: string[] = [];

  constructor(initial?: any) {
    const state = createState(initial);

    const handleScanMutation = (state: State<any>, mutation: Mutation): State<any> => {
      const { path, state: next } = mutation;
      if (mutation.type === 'SET') return applySet(state, path, next);
      if (mutation.type === 'MERGE') return applyMerge(state, path, next);
      if (mutation.type === 'DELETE') return applyDelete(state, path);
      return state;
    };

    const mutations: OperatorFunction<Mutation, State<any>> = $ =>
      initial
        ? $.pipe(startWith(state as any), scan(handleScanMutation))
        : $.pipe(scan(handleScanMutation));

    const mutation$ = this.mutations.pipe(
      mutations,
      distinctUntilChanged(
        (x, y) => x === y,
        state => state.hash.__hash,
      ),
      publishReplay(1),
    ) as ConnectableObservable<any>;

    this.subscription = mutation$.connect();
    this.state$ = mutation$;
  }

  get $(): Observable<any> {
    return this.state$.pipe(map(s => s.current));
  }

  $set = (state: any) => {
    this.mutate(this.path, state, 'SET');
  };

  $merge = (state: any) => {
    this.mutate(this.path, state, 'MERGE');
  };

  $delete = () => {
    this.mutate(this.path, undefined, 'DELETE');
  };

  mutate = (path: string[], state: any, type: MutationType) => {
    this.mutations.next({ path, state, type });
  };

  $dispose = () => {
    if (!this.subscription.closed) {
      this.mutations.complete();
      this.subscription.unsubscribe();
    }
  };

  $mount<T, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
    module: Module<T, TSourceArgs, TSinkArgs>,
    sources: TSourceArgs,
  ): MountedModule<TSinkArgs> {
    const mountableModule = module(sources);
    return mountableModule(this as any) as MountedModule<TSinkArgs>;
  }
}
