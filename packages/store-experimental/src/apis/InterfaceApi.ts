import { SliceApi, SliceApis, SliceNode } from '.';
import * as t from 'io-ts';
import { pluck } from 'rxjs/operators';
import { createSlice } from '../createSlice';

export const hasProps = (type: t.Any): type is t.InterfaceType<t.Props> => !!type['props'];

export const InterfaceApi = SliceApi('Interface', hasProps, (apis, type, node) => {
  for (const name in type.props) {
    Object.defineProperty(node, name, {
      get: () => {
        const _name = '__' + name;
        if (!node[_name]) {
          const nextType = type.props[name];
          const next$ = node.$.pipe(pluck(name));
          node[_name] = createSlice(apis, nextType, next$);
        }
        return node[_name];
      },
    });
  }
  return node;
});

export type InterfaceApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? SliceNode<TSliceApis, P[K]> : never;
    }
  : never;

declare module '.' {
  export interface Apis<T, A> {
    Interface: InterfaceApi<T, A>;
  }
}
