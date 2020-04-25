import * as t from 'io-ts';

/**
 * Example of using io-ts' recursion type so that typings are emitted properly.
 * You need a type alias for both the recursive instance type and the io-ts type definition,
 * otherwise the recursed type will resolve as 'any', or not at all.
 */

type _Recursion = {
  root: _Recursion;
};

export type Recursion = t.RecursiveType<
  t.TypeC<{
    root: Recursion;
  }>,
  _Recursion
>;

export const recursion: Recursion = t.recursion('Root', () =>
  t.type({
    root: recursion,
  })
);
