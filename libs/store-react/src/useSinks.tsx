import {mapSinksToProps} from '@cleric/store';
import {SinkArgs} from '@cleric/store/src/store';

export function useSinks<TSinkArgs extends SinkArgs>(sinks: TSinkArgs) {
  return mapSinksToProps(sinks);
}
