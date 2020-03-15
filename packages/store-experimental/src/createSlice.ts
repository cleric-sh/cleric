import { Observable } from 'rxjs';
import { Slice } from './Slice';
import * as t from 'io-ts';
import { SliceApis, SliceTypeOf } from './apis';
import { decorateSlice } from './decorateSlice';

interface CreateSlice {
  <TSliceApis extends Readonly<SliceApis>, T extends t.Any>(
    apis: TSliceApis,
    $type: T,
    $: Observable<t.TypeOf<T>>,
  ): SliceTypeOf<TSliceApis, T>;
}

export const createSlice: CreateSlice = (apis, type, $) => {
  const slice = new Slice(type, $);
  decorateSlice(apis, type, slice);
  return slice as SliceTypeOf<typeof apis, typeof type>;
};
