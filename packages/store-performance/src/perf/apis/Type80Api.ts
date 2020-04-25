import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type80} from '../types/Type80';

export const Type80Guard = (type: t.Any): type is Type80 =>
  type instanceof t.InterfaceType && !!type.props['type80'];

export const Type80Api = createApi('Type80Api', Type80Guard, slice => {
  slice['doType80'] = () => 'Type80';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type80Api: TType extends t.InterfaceType<t.PropsOf<Type80>>
      ? {doType80: () => string}
      : never;
  }
}
