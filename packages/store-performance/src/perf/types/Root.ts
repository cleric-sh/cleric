import * as t from 'io-ts';

import {Type1, type1} from './Type1';

export type Root = t.RecursiveType<
  t.TypeC<{
    root: Root;
    type1: Type1;
  }>
>;

export const root: Root = t.recursion('Root', () =>
  t.type({
    root,
    type1,
  })
);

// export type Root = typeof root;
