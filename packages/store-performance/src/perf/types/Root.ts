import * as t from 'io-ts';

import {Type1, type1} from './Type1';
export interface RootType {
  root: RootType;
  type1: t.TypeOf<Type1>;
}

export const root: t.Type<RootType> = t.recursion('Root', () =>
  t.type({
    root,
    type1,
  })
);

export type Root = typeof root;
