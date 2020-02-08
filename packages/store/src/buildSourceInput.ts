import { SourceInput, ISliceApi } from './store';
import { from, Subscribable } from 'rxjs';

const isSlice = <T>(source: SourceInput<T>): source is ISliceApi<T> => {
  return !!source['$'];
};

const isSubscribable = <T>(source: SourceInput<T>): source is Subscribable<T> => {
  return !!source['subscribe'];
};

export const buildSourceInput = <T>(source: SourceInput<T>): Subscribable<T> => {
  if (isSlice(source)) {
    return source.$;
  }

  if (isSubscribable(source)) {
    return source;
  } else {
    return from(source);
  }
};
