import {isArrayLike} from 'lodash';
import {ObservableInput, Subscribable} from 'rxjs';

import {AsyncFunction, ISliceApi, Source} from './store';

export const isSlice = <T>(source: unknown): source is ISliceApi<T> => {
  if (typeof source === 'object' && source) return !!source['$'];
  return false;
};

export const isSubscribable = <T>(source: unknown): source is Subscribable<T> => {
  if (typeof source === 'object' && source) return !!source['subscribe'];
  return false;
};

export const isPromise = <T>(source: unknown): source is Promise<T> => {
  if (typeof source === 'object' && source) return !!source['then'];
  return false;
};

export const isObservableInput = <T>(source: unknown): source is ObservableInput<T> => {
  return isArrayLike(source) || isSubscribable(source) || isPromise(source);
};

export const isAsyncFunction = <T>(source: unknown): source is AsyncFunction<T> => {
  return typeof source === 'function';
};

export const isSource = <T>(source: unknown): source is Source<T> => {
  return isSlice(source) || isObservableInput(source) || isAsyncFunction(source);
};
