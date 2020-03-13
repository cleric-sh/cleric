import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { SliceApi, SliceApis } from '.';
import { ApisFor } from '.';
import * as t from 'io-ts';

const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

export const IntersectionApi = SliceApi('Intersection', isIntersectionType, (type, node) => node);

export type IntersectionApi<
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

declare module '.' {
  export interface ApiTypes<T, A> {
    Intersection: IntersectionApi<T, A>;
  }
}

// import { Tuple, Union } from 'ts-toolbelt';
// import { Cast } from 'Any/Cast';
// import { SliceApi, SliceApis, MatchKeys, FetchApis } from '.';
// import { ApisFor } from '.';
// import * as t from 'io-ts';

// const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
//   type instanceof t.IntersectionType;

// export const IntersectionApi = SliceApi('Intersection', isIntersectionType, (type, node) => node);

// export type UniqueApis<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = Tuple.UnionOf<
//   T extends t.IntersectionType<infer CS>
//     ? CS extends t.Any[]
//       ? {
//           [I in keyof CS]: MatchKeys<TSliceApis, Cast<CS[I], t.Any>>;
//         }
//       : never
//     : never
// >;

// export type IntersectionApi<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = FetchApis<
//   TSliceApis,
//   UniqueApis<TSliceApis, T>,
//   T
// >;

// declare module '.' {
//   export interface ApiTypes<T, A> {
//     Intersection: IntersectionApi<T, A>;
//   }
// }
