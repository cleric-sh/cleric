import { SliceApi, SliceApis, SliceTypeOf } from '.';
import * as t from 'io-ts';
import { defineProperties } from './defineProperties';

export const hasProps = (type: t.Any): type is t.InterfaceType<t.Props> => !!type['props'];

export const InterfaceApi = SliceApi('Interface', hasProps, (apis, type, slice) => {
  defineProperties(apis, type, slice);
  return slice;
});

export type InterfaceApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? SliceTypeOf<TSliceApis, P[K]> : never;
    }
  : never;

declare module '.' {
  export interface ApiTypes<T, A> {
    Interface: InterfaceApi<T, A>;
  }
}
