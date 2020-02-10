import { Source } from './store';
import { from, Observable } from 'rxjs';
import { isArrayLike } from 'lodash';
import { isSlice, isSubscribable } from './guards';

export const buildSourceInput = <T>(source: Source<T>): Observable<T> => {
  if (isSlice(source)) {
    return source.$;
  }

  if (isSubscribable(source)) {
    return (source as unknown) as Observable<T>;
  }

  if (isArrayLike(source)) {
    return from(source);
  }

  throw `Param 'source' is not a valid Source type.`;
};
