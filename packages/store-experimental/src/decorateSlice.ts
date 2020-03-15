import { SliceApis } from './apis';
import { Slice } from './Slice';
import * as t from 'io-ts';

export const decorateSlice = (apis: Readonly<SliceApis>, type: t.Any, slice: Slice<t.Any>) => {
  const matchingApis = apis.filter(api => api.guard(type));
  matchingApis.reduce((slice, api) => {
    api.decorate(apis, type, slice);
    return slice;
  }, slice);
};
