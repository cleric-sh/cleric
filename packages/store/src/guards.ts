import { Source, ISliceApi, Sources } from './store';
import { Subscribable, ObservableInput } from 'rxjs';
import { isArrayLike } from 'lodash';

export const isSlice = <T>(source: unknown): source is ISliceApi<T> => {
  return !!source['$'];
};

export const isSubscribable = <T>(source: unknown): source is Subscribable<T> => {
  return !!source['subscribe'];
};

export const isPromise = <T>(source: unknown): source is Promise<T> => {
  return !!source['then'];
};

export const isObservableInput = <T>(source: unknown): source is ObservableInput<T> => {
  return isArrayLike(source) || isSubscribable(source) || isPromise(source);
};

export const isSource = <T>(source: unknown): source is Source<T> => {
  return isSlice(source) || isObservableInput(source);
};
