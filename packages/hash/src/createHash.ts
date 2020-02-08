import { hashNumber } from './hashNumber';
import { hashString } from './hashString';
import { hashObject } from './hashObject';
import { hashUndefined } from './hashUndefined';
import { HashState } from '.';
import { hashBoolean } from './hashBoolean';

export const createHash = <T>(value: T): HashState<T> => {
  if (typeof value === 'boolean') {
    return hashBoolean<T>(value);
  }

  if (typeof value === 'number') {
    return hashNumber<T>(value);
  }

  if (typeof value === 'string') {
    return hashString<T>(value);
  }

  if (typeof value === 'object') {
    return hashObject<T>(value);
  }

  if (typeof value === 'undefined' || value === null) {
    return hashUndefined<T>(value);
  }

  throw new Error("Can't hash values of type: " + typeof value);
};
