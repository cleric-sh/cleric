import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type16} from '../types/Type16';

export const Type16Guard = (type: t.Any): type is Type16 =>
  type instanceof t.InterfaceType && !!type.props['type16'];

export const Type16Api = createApi('Type16Api', Type16Guard, slice => {
  slice['doType16'] = () => 'Type16';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type16Api: TType extends t.InterfaceType<t.PropsOf<Type16>>
      ? {doType16: () => string}
      : never;
  }
}
