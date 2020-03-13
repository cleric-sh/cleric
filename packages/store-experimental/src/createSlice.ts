import { Observable, BehaviorSubject, from } from 'rxjs';
import { Tuple, Union, List } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { UnionSlice } from './UnionSlice';
import { IntersectionSlice } from './IntersectionSlice';
import { InterfaceSlice } from './InterfaceSlice';
import { Slice } from './Slice';
import * as t from 'io-ts';

type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;
type SliceDecorator<T extends t.Any> = {
  (type: T, slice: Slice<T>): Slice<T>;
};

interface SliceApi<TKey extends ApiKeys, T extends t.Any> {
  readonly key: TKey;
  readonly guard: SliceGuard<T>;
  readonly decorate: SliceDecorator<T>;
}

interface CreateSlice {
  <TSliceApis extends Readonly<SliceApis>, T extends t.Any>(
    apis: TSliceApis,
    $type: T,
    $: Observable<t.TypeOf<T>>,
  ): ApisFor<TSliceApis, T>;
}

export const createSlice: CreateSlice = (apis, type, $) => {
  const slice = new Slice(type, $);
  for (const api of apis) {
    if (api.guard(type)) api.decorate(type, slice);
  }
  return slice as ApisFor<typeof apis, typeof type>;
};

// Todo: Figure out how to pass typed API to Lookup type.
// - get rid of slice node inheritance. Only have a single SliceNode class, for extensions.
// - use functions to extend the SliceNode class with behavior.
// - these functions take 'type' as args and return the object that should be applied to the SliceNode.
// - the functions return the 'API' type.
// - these functions are linked with a guard
// - the guard and function together are known as a 'Resolver'.
// - e.g. resolver(isInterfaceType, <T>(type: T): InterfaceNode<T> => ({ ...createProperties(type) }))
// - in above example, t.InterfaceType is the guard type to check SliceNode's type against,
// - and InterfaceNode is the API type, and the function augments SliceNode.
//
// Good work so far! You got a store creating with no proxy, typed by io-ts!
// You even got strong type union types working, and half way through an extensible
// type lookup and plugin system! You're awesome!

// utilities for HKT pattern
// https://stackoverflow.com/questions/55683711/replace-generic-interface-type-parameter
interface ApiTypes<T extends Readonly<SliceApis>, A extends t.Any> {}
type ApiKeys = keyof ApiTypes<any, any>;
type ApiFor<T extends Readonly<SliceApis>, K extends ApiKeys, A extends t.Any> = ApiTypes<T, A>[K];

const SliceApi = <TKey extends ApiKeys, T extends t.Any>(
  key: TKey,
  guard: SliceGuard<T>,
  decorator: SliceDecorator<T>,
): SliceApi<TKey, T> => ({ key, guard, decorate: decorator });

const isInterfaceType = (type: t.Any): type is t.InterfaceType<t.Props> =>
  type instanceof t.InterfaceType;

const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> => type instanceof t.UnionType;
const isAnyType = (type: t.Any): type is t.Any => type instanceof t.AnyType;

const InterfaceApi = SliceApi('Interface', isInterfaceType, (type, node) => ({}));
type InterfaceApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? ApisFor<TSliceApis, P[K]> : never;
    }
  : never;

const IntersectionApi = SliceApi('Intersection', isIntersectionType, (type, node) => ({}));
type IntersectionApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.IntersectionType<infer CS>
  ? Union.Merge<
      Tuple.UnionOf<
        {
          [K in keyof CS]: ApisFor<TSliceApis, Cast<CS[K], t.Any>>;
        }
      >
    >
  : never;

interface $IsApi<TSliceApis extends Readonly<SliceApis>, TCS extends List.List<any>> {
  $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => ApisFor<TSliceApis, TSubType>;
}
const UnionApi = SliceApi('Union', isUnionType, (type, node) => ({}));
type UnionApi<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = T extends t.UnionType<
  infer TCS
> // ? $IsApi<TSliceApis, TCS>
  ? {
      $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => ApisFor<TSliceApis, TSubType>;
    }
  : never;

const ObservableApi = SliceApi('Observable', isAnyType, (type, node) => ({}));
type ObseravbleApi<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = {
  $: Observable<t.TypeOf<T>>;
};

type SliceApis = SliceApi<ApiKeys, t.Any>[];

type MatchApi<
  TSliceApis extends Readonly<SliceApis>,
  K extends ApiKeys,
  G extends t.Any,
  T extends t.Any
> = T extends G ? ApiFor<TSliceApis, K, T> : never;

type MatchApis<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = {
  [K in keyof TSliceApis]: TSliceApis[K] extends SliceApi<infer ApiKey, infer G>
    ? MatchApi<TSliceApis, ApiKey, G, T>
    : never;
};

type ApisFor<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApis<TSliceApis, T>>
>;

// Register API types like this.
// Refer to API types with their string key.
interface ApiTypes<T, A extends t.Any> {
  Observable: ObseravbleApi<T, A>;
  Interface: InterfaceApi<T, A>;
  Intersection: IntersectionApi<T, A>;
  Union: UnionApi<T, A>;
}

const _foo = t.type({ foo: t.number });
const _bar = t.type({ bar: t.string });
const _intersection = t.intersection([_foo, _bar]);
const _union = t.union([_foo, _bar]);
const _complex = t.type({
  first: _foo,
  second: _bar,
  intersection: _intersection,
  union: _union,
});

const Apis = [ObservableApi, InterfaceApi, IntersectionApi, UnionApi] as const;

type Z = ApiFor<typeof Apis, 'Interface', typeof _foo>;

type M = MatchApi<typeof Apis, 'Union', t.UnionType<t.Any[]>, typeof _union>;
type N = MatchApis<typeof Apis, typeof _union>;
type A = ApisFor<typeof Apis, typeof _intersection>;
const slice = createSlice(Apis, _complex, from([]));
