import {Cast} from 'Any/Cast';
import {List, Union} from 'ts-toolbelt';

import {AsList} from './AsList';

/**
 * A placeholder error type enabling more descriptive errors in Typings.
 *
 * This class should never be instantiated.
 */
export abstract class TError<TMsg extends string|string[],
                                          TType extends string = 'TypeError'> {
  readonly __tag = '@cleric/common/TypeError';
  readonly __ErrorType?: TType;
  readonly __ErrorMsg?: TMsg;
  constructor() {
    throw `TypeError should never be instantiated since it's for typings only. Check your code!`;
  }
}

/**
 * Experimental pattern for handling type errors gracefully.
 * The idea is to allow type errors to be augmented with additional messages
 * along the stack.
 */
export type TryCatch<T, TMessage extends string = never> = T extends
    TError<infer M>
        ? TError<TMessage extends
                     never ? M
                           : List.Concat<AsList<Cast<M, string>>, [ TMessage ]>>
        : Union.Exclude<T, TError<any>>;
