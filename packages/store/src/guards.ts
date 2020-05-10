import {isArrayLike} from 'lodash';
import {ObservableInput} from 'rxjs';

import {isPromise, isSubscribable} from '@cleric/common/src/guards';
import {AsyncFunction, SliceApiI, Source} from './store';

export const isSlice = <T>(source: unknown): source is SliceApiI<T> => {
  if (typeof source === 'object' && source) return !!source['$'];
  return false;
};

export const isObservableInput = <T>(
  source: unknown
): source is ObservableInput<T> => {
  return isArrayLike(source) || isSubscribable(source) || isPromise(source);
};

export const isAsyncFunction = <T>(
  source: unknown
): source is AsyncFunction<T> => {
  return typeof source === 'function';
};

export const isSource = <T>(source: unknown): source is Source<T> => {
  return (
    isSlice(source) || isObservableInput(source) || isAsyncFunction(source)
  );
};

export {isPromise, isSubscribable};
