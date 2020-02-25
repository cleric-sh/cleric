import { Source } from './store';
import { from, Observable } from 'rxjs';
import { isArrayLike } from 'lodash';
import { isSlice, isSubscribable, isPromise, isAsyncFunction } from './guards';

export const buildSourceInput = <T>(source: Source<T>): Observable<T> => {
  if (isSlice(source)) {
    return source.$ as Observable<T>;
  }

  if (isSubscribable(source)) {
    return (source as unknown) as Observable<T>;
  }

  if (isArrayLike(source)) {
    return from(source);
  }

  if (isAsyncFunction(source)) {
    const promise = source();
    if (isPromise(promise)) {
      return from(promise) as Observable<T>;
    } else throw 'Return value from function was not Promise-like.';
  }

  throw `Param 'source' is not a valid Source type.`;
};
