import * as t from 'io-ts';

export const FooBar = t.type({
  bar: t.number,
  foo: t.string,
});
