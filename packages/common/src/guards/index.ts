import {Subscribable} from 'rxjs';

export const isSubscribable = <T>(
  source: unknown
): source is Subscribable<T> => {
  if (typeof source === 'object' && source) return !!source['subscribe'];
  return false;
};

export const isPromise = <T>(source: unknown): source is Promise<T> => {
  if (typeof source === 'object' && source) return !!source['then'];
  return false;
};
