import * as t from 'io-ts';

export const fooBar = t.type({
  bar: t.number,
  foo: t.string,
});

export type FooBar = typeof fooBar;
