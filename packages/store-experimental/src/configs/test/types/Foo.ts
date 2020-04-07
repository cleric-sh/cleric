import * as t from 'io-ts';

export const foo = t.type({
  foo: t.string,
});

export type Foo = typeof foo;
