import { Observable } from 'rxjs';
import { Slice } from './Slice';
import * as t from 'io-ts';
import { SliceApis, SliceNode } from './apis';

interface CreateSlice {
  <TSliceApis extends Readonly<SliceApis>, T extends t.Any>(
    apis: TSliceApis,
    $type: T,
    $: Observable<t.TypeOf<T>>,
  ): SliceNode<TSliceApis, T>;
}

export const createSlice: CreateSlice = (apis, type, $) => {
  const slice = new Slice(type, $);
  for (const api of apis) {
    if (api.guard(type)) api.decorate(apis, type, slice);
  }
  return slice as SliceNode<typeof apis, typeof type>;
};
