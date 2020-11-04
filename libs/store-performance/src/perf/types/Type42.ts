import * as t from 'io-ts';

export const type42 = t.type({
  type42: t.string,
});

export type Type42 = typeof type42;
