import { buildSourceInput } from './buildSourceInput';
import { SourceSpec, SourceMap } from './store';

export const buildSourceProps = <TSourceSpec extends SourceSpec>(
  sources: SourceMap<TSourceSpec>,
): SourceMap<TSourceSpec> =>
  Object.getOwnPropertyNames(sources).reduce((props, name) => {
    const source = sources[name];
    props[name] = buildSourceInput(source);
    return props;
  }, {}) as SourceMap<TSourceSpec>;
