import * as t from 'io-ts';

export const foo = t.type({foo: t.string});
export type Foo = typeof foo;
export type FooType = t.TypeOf<Foo>;
export type FooProps = t.PropsOf<Foo>;

export const bar = t.type({bar: t.string});
export type Bar = typeof bar;
export type BarType = t.TypeOf<Bar>;
export type BarProps = t.PropsOf<Bar>;

export const baz = t.type({baz: t.string});
export type Baz = typeof baz;
export type BazType = t.TypeOf<Baz>;
export type BazProps = t.PropsOf<Baz>;

export const fooBar = t.type({foo: t.string, bar: t.string});
export type FooBar = typeof fooBar;
export type FooBarType = t.TypeOf<FooBar>;
export type FooBarProps = t.PropsOf<FooBar>;
