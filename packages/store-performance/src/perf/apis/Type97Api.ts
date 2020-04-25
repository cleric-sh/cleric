import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type97} from '../types/Type97';

export const Type97Guard = (type: t.Any): type is Type97 =>
  type instanceof t.InterfaceType && !!type.props['type97'];

export const Type97Api = createApi('Type97Api', Type97Guard, slice => {
  slice['doType97'] = () => 'Type97';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type97Api: TType extends t.InterfaceType<t.PropsOf<Type97>>
      ? {doType97: () => string}
      : never;
  }
}
