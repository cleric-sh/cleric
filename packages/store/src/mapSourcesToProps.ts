import { buildSourceInput } from './buildSourceInput';
import { Source, Sources, ShapeFromSources } from './store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isSource } from './guards';

export function mapSourcesToProps<T>(source: Source<T>): Observable<T>;
export function mapSourcesToProps<TSources extends Sources>(
  sources: TSources,
): Observable<ShapeFromSources<TSources>>;
export function mapSourcesToProps(input: any) {
  if (isSource(input)) {
    return buildSourceInput(input);
  }

  const names = Object.getOwnPropertyNames(input);
  const observables = names.map(name => buildSourceInput(input[name]));
  return combineLatest(...observables).pipe(
    map(values => {
      const props = {};
      // The order of values in combineLatest is the same as the order of names, so look them up by index.
      values.forEach((value, index) => {
        props[names[index]] = value;
      });
      return props;
    }),
  );
}
