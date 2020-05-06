import {MaybePromise} from '../util/MaybePromise';
export interface Spec<T> {
  files: (...args: any[]) => MaybePromise<T>;
}
