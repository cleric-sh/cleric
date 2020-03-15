import { SliceApis } from './apis';
import { Slice } from './Slice';
import * as t from 'io-ts';

export const decorateSlice = (apis: Readonly<SliceApis>, type: t.Any, slice: Slice<t.Any>) => {
  for (const api of apis) {
    if (api.guard(type)) api.decorate(apis, type, slice);
  }
};
