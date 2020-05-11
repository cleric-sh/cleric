import {MaybePromise} from '../util/MaybePromise';

export type StringWriter = {
  (value: string): MaybePromise<string>;
};
