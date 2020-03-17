/**
 * A placeholder error type enabling more descriptive errors in Typings.
 *
 * This class should never be instantiated.
 */
export abstract class TError<TMsg extends string, TType extends string = 'TypeError'> {
  readonly __tag = '@cleric/common/TypeError';
  readonly __ErrorType?: TType;
  readonly __ErrorMsg?: TMsg;
  constructor() {
    throw `TypeError should never be instantiated since it's for typings only. Check your code!`;
  }
}
