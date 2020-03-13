/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { BehaviorSubject, from } from 'rxjs';
import { createSlice } from './createSlice';
import { ObservableApi } from './apis/ObservableApi';
import { InterfaceApi } from './apis/InterfaceApi';
import { IntersectionApi, UniqueApis } from './apis/IntersectionApi';
import { UnionApi } from './apis/UnionApi';
import { UnionSlice } from './UnionSlice';
import { Slice } from './Slice';
import { MatchApis, MatchKeys, ApiKeys, ApiFor, SliceApis } from './apis';
import { Union, Object } from 'ts-toolbelt';

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

const Apis = [ObservableApi, InterfaceApi, UnionApi, IntersectionApi] as const;
// const Apis = [IntersectionApi] as const;

const node = createSlice(Apis, schema, src);

type tt = IntersectionApi<typeof Apis, typeof schema>;

node.$.subscribe(p => console.log(p));
node.union.$is(two).$.subscribe(p => console.log(p));
node.union.$is(one).one.$.subscribe(p => console.log(p));

type keys = MatchKeys<typeof Apis, typeof union>;

// type Z = ApiFor<typeof Apis, 'Interface', typeof _foo>;

// type M = MatchApi<typeof Apis, 'Union', t.UnionType<t.Any[]>, typeof _union>;
// type N = MatchApis<typeof Apis, typeof _union>;
// type A = ApisFor<typeof Apis, typeof _intersection>;
