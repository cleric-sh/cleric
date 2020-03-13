import { Observable } from 'rxjs';
import { Slice } from './Slice';
import * as t from 'io-ts';
import { SliceApis, ApisFor, MatchKeys, ApiKeys } from './apis';

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
  type Keys = MatchKeys<typeof apis, typeof type>;
  type Slice<TKeys extends ApiKeys> = ApisFor<typeof apis, typeof type> & { __brand: TKeys };
  return slice as Slice<Keys>;
};

// export const createSlice = <TSliceApis extends Readonly<SliceApis>, T extends t.Any>(
//   apis: TSliceApis,
//   type: T,
//   $: Observable<t.TypeOf<T>>,
// ) => {
//   const slice = new Slice(type, $);
//   for (const api of apis) {
//     if (api.guard(type)) api.decorate(type, slice);
//   }
//   type Keys = MatchKeys<TSliceApis, T>;
//   type Slice<TKeys> = ApisFor<TSliceApis, T> & { $apis: TKeys };
//   return slice as Slice<Keys>;
// };
