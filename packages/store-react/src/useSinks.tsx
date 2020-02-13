import { SinkArgs } from '@cleric/store/src/store';
import { mapSinksToProps } from '@cleric/store';

export function useSinks<TSinkArgs extends SinkArgs>(sinks: TSinkArgs) {
  return mapSinksToProps(sinks);
}
