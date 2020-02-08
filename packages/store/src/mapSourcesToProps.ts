import { buildSourceInput } from './buildSourceInput';
import { SourceSpec, SourceMap, SourceProps$ } from './store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

export const mapSourcesToProps = <TSourceMap extends SourceMap<SourceSpec>>(
  sources: TSourceMap,
): SourceProps$<TSourceMap> => {
  const names = Object.getOwnPropertyNames(sources);
  const observables = names.map(name => buildSourceInput(sources[name]));
  return combineLatest(...observables).pipe(
    map(values => {
      const props = {};
      // The order of values in combineLatest is the same as the order of names, so look them up by index.
      values.forEach((value, index) => {
        props[names[index]] = value;
      });
      return props;
    }),
  ) as SourceProps$<TSourceMap>;
};
