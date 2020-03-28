import {convertArgsToProps} from './convertArgsToProps';
import {connectReducer, convertReducerArgsToObservables} from './createReducer';
import {mapSinksToProps} from './mapSinksToProps';
import {Module, ModuleSpec, MountableModule, MountedModule, SinkArgs, SinkProps, Slice, SourceArgs, SourceProps,} from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createModule<TState, TSourceArgs extends SourceArgs>(name: string) {
  return <TSinkArgs extends SinkArgs = {}>(
             spec: ModuleSpec<TState, TSourceArgs, TSinkArgs>,
             ): Module<TState, TSourceArgs, TSinkArgs> => {
    return (sources: TSourceArgs): MountableModule<TState, TSinkArgs> => (
               slice: Slice<TState>,
               ) => {
      const sourceProps = convertArgsToProps(sources);
      const sinks = spec.sinks ? spec.sinks() : {};
      const sinkProps = mapSinksToProps(sinks);

      const props = Object.assign(sourceProps, sinkProps) as SourceProps<TSourceArgs>& SinkProps<TSinkArgs>;

      const effects = spec.effects ? spec.effects(props, slice) : {};

      const subscriptions = Object.getOwnPropertyNames(effects).map(name => {
        return effects[name].subscribe();
      });

      if (spec.reducer) {
        const reducer = spec.reducer(sourceProps, slice);
        const reducerObservables = convertReducerArgsToObservables(slice, reducer);
        const reducerSubscriptions = connectReducer(slice, reducerObservables);

        subscriptions.push(...reducerSubscriptions);
      }

      const mountedModule = {
        dispose: () => {
          subscriptions.forEach(subscription => {
            subscription.unsubscribe();
          });
        },
      };

      Object.assign(mountedModule, sinks);

      slice.$.subscribe({
        complete: () => mountedModule.dispose(),
      });

      return mountedModule as MountedModule<TSinkArgs>;
    };
  };
}
