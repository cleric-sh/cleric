import * as t from 'io-ts';

export const type1 = t.type({
  type1: t.string,
});

export type Type1 = typeof type1;
