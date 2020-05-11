import {MaybePromise} from '../util/MaybePromise';

/**
 * Accepts a template string as an argument.
 * The template string is generated from the same string,
 * possibly after some transforms have been applied.
 */
export type StringWriter = {
  (value: string): MaybePromise<string>;
};
