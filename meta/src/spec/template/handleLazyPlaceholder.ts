import {isPromise} from '@cleric/common';
import {isRef} from '../isRef';

export const handleLazyPlaceholder = async (value: Function) => {
  const maybePromise = value();

  const lazyValue = isPromise(maybePromise) ? await maybePromise : maybePromise;

  if (isRef(lazyValue)) {
    return 'testRef: ' + lazyValue.name;
  }

  throw 'Unrecognized lazy value: ' + lazyValue;
};
