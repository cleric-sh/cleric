import * as t from 'io-ts';

export const isRecursiveType = (type: t.Any): type is t.RecursiveType<t.Any> =>
  type instanceof t.RecursiveType;
