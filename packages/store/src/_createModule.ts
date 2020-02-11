import { convertArgsToProps } from './convertArgsToProps';
import {
  SinkArgs,
  ModuleSpec,
  Module,
  MountableModule,
  Slice,
  MountedModule,
  SourceProps,
  SourceArgs,
  SinkProps,
} from './store';
import { mapSinksToProps } from './mapSinksToProps';
import { connectReducer, createReducer } from './createReducer';

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

      const props = Object.assign(sourceProps, sinkProps) as SourceProps<TSourceArgs> &
        SinkProps<TSinkArgs>;

      const effects = spec.effects ? spec.effects(slice, props) : [];

      const subscriptions = Object.getOwnPropertyNames(effects).map(name =>
        effects[name].subscribe(),
      );

      if (spec.reducer) {
        const reducer = spec.reducer(slice, sourceProps);
        const reducerObservables = convertArgsToProps(reducer);
        const reducerSubscrptions = connectReducer(slice, reducerObservables);
        subscriptions.push(reducerSubscrptions);
      }

      const mountedModule = {
        dispose: () => {
          subscriptions.forEach(subscription => subscription.unsubscribe());
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
