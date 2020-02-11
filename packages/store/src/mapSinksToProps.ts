import { SinkArgs, SinkProps } from './store';
import { isObservable } from 'rxjs';

export const mapSinksToProps = <TSinkMap extends SinkArgs>(sinks: TSinkMap): SinkProps<TSinkMap> =>
  Object.getOwnPropertyNames(sinks).reduce((props, name) => {
    const sink = sinks[name];
    if (isObservable(sink)) props[name] = sink.next.bind(sink);
    else if (typeof sink === 'function') props[name] = sink;
    else throw new Error('Invalid sink type.');
    return props;
  }, {}) as SinkProps<TSinkMap>;
