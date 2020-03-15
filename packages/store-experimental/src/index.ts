/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { createSlice } from './createSlice';
import { InterfaceApi } from './apis/InterfaceApi';
import { IntersectionApi } from './apis/IntersectionApi';
import { UnionApi } from './apis/UnionApi';
import { ApiTypes, Configurations } from './apis';

const one = t.type({ one: t.string });
const two = t.type({ two: t.number });

const union = t.union([one, two]);

const partial = t.partial({ maybe: t.string });

const schema = t.intersection([
  t.type({
    foo: t.string,
    bar: t.number,
    obj: t.type({
      val: t.string,
    }),
    union,
  }),
  partial,
]);

const initial: t.TypeOf<typeof schema> = {
  bar: 1,
  foo: 'myString',
  obj: {
    val: 'valString',
  },
  union: {
    one: '123',
  },
};

const src = new BehaviorSubject(initial);

const MyApis = [InterfaceApi, UnionApi, IntersectionApi] as const;

declare module './apis' {
  export interface Configurations {
    My: typeof MyApis;
  }
}

Configurations.My = MyApis;

const node = createSlice(MyApis, schema, src);

node.$.subscribe(p => console.log(p));
node.union.$is(two).$.subscribe(p => console.log(p));
node.union.$is(one).one.$.subscribe(p => console.log(p));
