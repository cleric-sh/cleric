import * as t from 'io-ts';

export const FooBar = t.type({
  foo: t.string,
  bar: t.number,
});
