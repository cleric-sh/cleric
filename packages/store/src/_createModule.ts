import { buildSourceObservables } from './buildSourceObservables';
import {
  SourceSpec,
  SinkMap,
  ModuleSpec,
  Module,
  ConnectedModule,
  Slice,
  MountedModule,
  SourceBuilt,
} from './store';
import { mapSinksToProps } from './mapSinksToProps';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createModule<TState, TSourceSpec extends SourceSpec>(name: string) {
  return <TSinkMap extends SinkMap = {}>(
    spec: ModuleSpec<TState, TSourceSpec, TSinkMap>,
  ): Module<TState, TSourceSpec, TSinkMap> => {
    return (sources: SourceBuilt<SourceSpec>): ConnectedModule<TState, TSinkMap> => (
      slice: Slice<TState>,
    ) => {
      const sourceProps = buildSourceObservables(sources);

      const sinks = spec.sinks ? spec.sinks() : {};

      const sinkProps = mapSinksToProps(sinks);

      const props = Object.assign(sourceProps, sinkProps);

      const effects = spec.effects(props as any, slice);

      const subscriptions = Object.getOwnPropertyNames(effects).map(name =>
        effects[name].subscribe(),
      );

      const mountedModule = {
        dispose: () => {
          subscriptions.forEach(subscription => subscription.unsubscribe());
        },
      };

      Object.assign(mountedModule, sinks);

      slice.$.subscribe({
        complete: () => mountedModule.dispose(),
      });

      return mountedModule as MountedModule<TSinkMap>;
    };
  };
}
