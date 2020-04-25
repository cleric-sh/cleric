import {Pass, check, checks} from '@cleric/common';

describe('union', () => {
  it('can be converted to an intersection', () => {
    /**
     * @author https://stackoverflow.com/users/2887218/jcalz
     * @see https://stackoverflow.com/a/50375286/10325032
     */
    type UToI<U> = (U extends unknown ? (argument: U) => void : never) extends (
      argument: infer I
    ) => void
      ? I
      : never;

    // Also available in ts-toolbelt as Union.IntersectOf

    type A = {a: 'A'};
    type B = {b: 'B'};
    /**
     * https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
     */
    type actual = UToI<A | B>;
    type expected = A & B;

    checks([check<actual, expected, Pass>()]);
  });
});
