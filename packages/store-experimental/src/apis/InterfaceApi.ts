import { SliceApi, SliceApis } from '.';
import { ApisFor } from '.';
import * as t from 'io-ts';

const isInterfaceType = (type: t.Any): type is t.InterfaceType<t.Props> =>
  type instanceof t.InterfaceType;

export const InterfaceApi = SliceApi('Interface', isInterfaceType, (type, node) => node);

export type InterfaceApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? ApisFor<TSliceApis, P[K]> : never;
    }
  : never;

declare module '.' {
  export interface ApiTypes<T, A> {
    Interface: InterfaceApi<T, A>;
  }
}
