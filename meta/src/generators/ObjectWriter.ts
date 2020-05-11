import {MaybePromise} from '../util/MaybePromise';

/**
 * Accepts a typed object as an argument for the template.
 * The template string is generated from the object.
 */
export type ObjectWriter<T extends object> = {
  (value: T): MaybePromise<string>;
};
