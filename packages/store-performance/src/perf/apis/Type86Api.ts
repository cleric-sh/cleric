import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type86} from '../types/Type86';

export const Type86Guard = (type: t.Any): type is Type86 =>
  type instanceof t.InterfaceType && !!type.props['type86'];

export const Type86Api = createApi('Type86Api', Type86Guard, slice => {
  slice['doType86'] = () => 'Type86';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type86Api: TType extends t.InterfaceType<t.PropsOf<Type86>>
      ? {doType86: () => string}
      : never;
  }
}
