import { Source, Sources } from './store';
import { from, Subscribable } from 'rxjs';
import { mapSourcesToProps } from './mapSourcesToProps';
import { isArrayLike } from 'lodash';
import { isSlice, isSubscribable, isSource } from './guards';

export const buildSourceInput = <T>(source: Source<T> | Sources<T>): Subscribable<T> => {
  if (typeof source === 'object' && !isSource(source)) {
    console.log(source);
    return mapSourcesToProps(source as any) as Subscribable<T>;
  }

  if (isSlice(source)) {
    return source.$;
  }

  if (isSubscribable(source)) {
    return source;
  }

  if (isArrayLike(source)) {
    return from(source);
  }
};
