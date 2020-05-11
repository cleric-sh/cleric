import {MaybePromise} from '../util/MaybePromise';

export type ObjectWriter<T extends object> = {
  (value: T): MaybePromise<string>;
};
