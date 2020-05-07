import {Pass, check, checks} from '@cleric/common';

describe('tuples', () => {
  it('can be inferred instead of arrays, with a compiler hint', () => {
    // See: https://stackoverflow.com/questions/61638616/can-i-infer-a-tuple-type-from-a-functions-return-type-without-using-as-const/61639024#61639024

    /**
     * By default, Typescript infers an array as an unbounded array, not a tuple.
     *
     * However, in cases where the order of the types of elements is relevant,
     * we lose information. E.g. there's no guaranteed string came before number,
     * and we lose the fact that the third index is also a string.
     */
    type Array = unknown[];
    const createArray = <T extends Array>(fn: () => T) => fn;
    const resultArray = createArray(() => ['a', 2, 'a']);

    checks([
      check<ReturnType<typeof resultArray>, (string | number)[], Pass>(),
    ]);

    /**
     * By using the hint '[type] | type[]' the typescript compiler will infer
     * a tuple instead.
     */
    type Tuple = [unknown] | unknown[];
    const createTuple = <T extends Tuple>(fn: () => T) => fn;
    const resultTuple = createTuple(() => ['a', 2, 'a']);

    checks([
      check<ReturnType<typeof resultTuple>, [string, number, string], Pass>(),
    ]);
  });
});
