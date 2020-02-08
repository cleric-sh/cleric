import { SinkMap, SinkProps } from './store';

export const mapSinksToProps = <TSinkMap extends SinkMap>(sinks: TSinkMap): SinkProps<TSinkMap> =>
  Object.getOwnPropertyNames(sinks).reduce((props, name) => {
    const sink = sinks[name];
    props[name] = sink.next.bind(sink);
    return props;
  }, {}) as SinkProps<TSinkMap>;
