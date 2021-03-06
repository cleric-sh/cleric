import {
  ConnectableObservable,
  Observable,
  OperatorFunction,
  Subject,
  Subscription,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  publishReplay,
  scan,
  startWith,
} from 'rxjs/operators';

import {applyDelete} from './applyDelete';
import {applyMerge} from './applyMerge';
import {applySet} from './applySet';
import {createMutator} from './createMutator';
import {createState} from './createState';
import {
  Module,
  MountedModule,
  Mutation,
  Mutator,
  SinkArgs,
  SourceArgs,
  State,
  StoreI,
} from './store';

const applyMutation = (
  state: State<unknown>,
  mutation: Mutation
): State<unknown> => {
  const {path, state: next} = mutation;
  if (mutation.type === 'SET') return applySet(state, path, next);
  if (mutation.type === 'MERGE') return applyMerge(state, path, next);
  if (mutation.type === 'DELETE') return applyDelete(state, path);
  return state;
};

const applyMutations = (
  state: State<unknown>,
  mutations: Mutation[]
): State<unknown> => {
  return mutations.reduce(applyMutation, state);
};

const scanMutate: (
  initial?: unknown
) => OperatorFunction<Mutation[], State<unknown>> = initial => $ =>
  initial
    ? $.pipe(startWith(createState(initial) as any), scan(applyMutations))
    : $.pipe(scan(applyMutations));

/**
 * A StoreNode is the root wrapper for the current state, allowing slices to be
 * created for any path of properties within its state. It applies set and merge
 * operations, re-calculating hash values as required, ensuring only value-based
 * changes are emitted.
 */
export class StoreNode implements StoreI<unknown> {
  private mutations = new Subject<Mutation[]>();
  public state$: Observable<State<unknown>>;
  private subscription: Subscription;
  public readonly path: string[] = [];

  constructor(initial?: unknown) {
    const mutation$ = this.mutations.pipe(
      scanMutate(initial),
      distinctUntilChanged(
        (x, y) => x === y,
        state => state.hash.__hash
      ),
      publishReplay(1)
    ) as ConnectableObservable<any>;

    this.subscription = mutation$.connect();
    this.state$ = mutation$;
  }

  get $(): Observable<any> {
    return this.state$.pipe(map(s => s.current));
  }

  $set = (state: any) => {
    this.mutate([{path: this.path, state, type: 'SET'}]);
  };

  $merge = (state: any) => {
    this.mutate([{path: this.path, state, type: 'MERGE'}]);
  };

  $delete = () => {
    this.mutate([{path: this.path, state: undefined, type: 'DELETE'}]);
  };

  $batch = (mutationFn: (mutator: Mutator<unknown>) => void) => {
    const [mutations, mutator] = createMutator();
    mutationFn(mutator);
    this.mutate(mutations);
  };

  mutate = (mutations: Mutation[]) => {
    this.mutations.next(mutations);
  };

  $dispose = () => {
    if (!this.subscription.closed) {
      this.mutations.complete();
      this.subscription.unsubscribe();
    }
  };

  $mount<T, TSourceArgs extends SourceArgs, TSinkArgs extends SinkArgs>(
    module: Module<T, TSourceArgs, TSinkArgs>,
    sources: TSourceArgs
  ): MountedModule<TSinkArgs> {
    const mountableModule = module(sources);
    return mountableModule(this as any) as MountedModule<TSinkArgs>;
  }
}
