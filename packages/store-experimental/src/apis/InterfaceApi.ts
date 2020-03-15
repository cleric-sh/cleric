import { SliceApi } from './SliceApi';
import * as t from 'io-ts';
import { defineProperties } from './defineProperties';
import { ConfigKey } from '../config';
import { Slice } from '.';

export const hasProps = (type: t.Any): type is t.InterfaceType<t.Props> => !!type['props'];

export const InterfaceApi = SliceApi('Interface', hasProps, (apis, type, slice) => {
  defineProperties(apis, type, slice);
  return slice;
});

export type InterfaceApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? Slice<TConfigKey, P[K]> : never;
    }
  : never;

declare module '.' {
  export interface ApiTypes<TConfigKey, TType> {
    Interface: InterfaceApi<TConfigKey, TType>;
  }
}
