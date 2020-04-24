import * as t from 'io-ts';

export type TypeOfRecursive<
  TRecursive extends t.RecursiveType<t.Any>
> = TRecursive extends t.RecursiveType<infer C> ? t.TypeOf<C> : never;
