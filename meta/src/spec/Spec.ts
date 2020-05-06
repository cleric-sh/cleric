import {MaybePromise} from '../util/MaybePromise';

export interface Spec<T> {
  files: (...args: never[]) => MaybePromise<T>;
}
