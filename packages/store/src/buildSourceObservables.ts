import { buildSourceInput } from './buildSourceInput';
import { Sources, SourceObservables, Shape, SourcesFromShape } from './store';

export const buildSourceObservables = <TSourceShape extends Shape>(
  sources: SourcesFromShape<TSourceShape>,
): SourceObservables<TSourceShape> =>
  Object.getOwnPropertyNames(sources).reduce((props, name) => {
    const source = sources[name];
    props[name] = buildSourceInput(source);
    return props;
  }, {}) as SourceObservables<TSourceShape>;
