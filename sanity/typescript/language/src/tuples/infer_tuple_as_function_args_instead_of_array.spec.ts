import {Pass, check, checks} from '@cleric/common';

describe('as function arguments', () => {
  /**
   * Normally, Typescript infers array arguments as an unbounded array, not a tuple.
   */
  describe('normally', () => {

    it('are inferred as arrays', () => {

      const createArray = <T>(array: T) => array;
      const resultArray = createArray(['a', 2, 'b']);

      checks([
        check<typeof resultArray, (string | number)[], Pass>(),
      ]);
    })
  });

  /**
   * By using the hint '[type] | type[]' the typescript compiler will infer
   * a tuple instead of an array.
   *
   * See: https://stackoverflow.com/questions/61638616/can-i-infer-a-tuple-type-from-a-functions-return-type-without-using-as-const/61639024#61639024
   */
  describe('instead', () => {
    it('can be inferred as tuples, with a compiler hint', () => {

      type AsTuple = [unknown] | unknown[];
      const createTuple = <T extends AsTuple>(tuple: T) => tuple;
      const resultTuple = createTuple(['a', 2, 'b']);

      checks([
        check<typeof resultTuple, [string, number, string], Pass>(),
      ]);
    })
  })
});
