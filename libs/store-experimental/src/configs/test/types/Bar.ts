import * as t from 'io-ts';

export const bar = t.type({
  bar: t.number,
});

export type Bar = typeof bar;
