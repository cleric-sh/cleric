import {Pass, check, checks} from '@cleric/common';
import {Class} from "Class/Class";

describe('fixed-length tuples', () => {
  /**
   * See also: https://github.com/microsoft/TypeScript/issues/42435
   */
  describe('normally', () => {
    /**
     * Normally, TS won't narrow the inferred types of tuple elements.
     *
     */
    it('infer a common base type for each element', () => {

      type Shape = [unknown, unknown];
      function get<T extends Shape>(tuple: T) {
        return tuple;
      }

      const tuple = get(['a', 2]);

      checks([
        check<typeof tuple, [string, number], Pass>(),
      ]);
    });

  })

  describe('instead', () => {
    describe('if the elements are generic arguments', () => {
      it('will narrow them to literal types ', () => {

        type Shape<T1, T2> = [T1, T2];

        /**
         * Extend the elements by the type you wish to narrow from.
         * @param tuple
         */
        function get<T extends Shape<T1, T2>, T1 extends string, T2 extends number>(tuple: T) {
          return tuple;
        }

        const tuple = get(['a', 2]);

        checks([
          check<typeof tuple, ['a', 2], Pass>(),
        ]);
      })
    })
  })

  describe('also', () => {
    describe('for tuples of tuples', () => {
      describe('normally', () => {
        it('elements of elements infer a common base type', () => {

          type Shape = [unknown, unknown];
          /**
           * Extend the elements by the type you wish to narrow from.
           */
          function get<T extends [...Shape[]]>(...tuples: T) {
            return tuples;
          }

          const tuple = get(['a', 2], ['b', 1]);

          checks([
            check<typeof tuple, [[string, number], [string, number]], Pass>(),
          ]);
        })
      })

      describe('instead', () => {
        describe('if the elements of elements are generic arguments', () => {
          it(`will narrow each element's elements to their own literal types`, () => {

            /**
             * Extend the elements by the type you wish to narrow from.
             */
            function get<T extends [...[T1, T2][]], T1 extends string, T2 extends number>(...tuples: T) {
              return tuples;
            }

            const tuples = get(['a', 2], ['b', 1]);

            checks([
              check<typeof tuples, [['a', 2], ['b', 1]], Pass>(),
            ]);
          })

        })
      })

    })
  })

});
