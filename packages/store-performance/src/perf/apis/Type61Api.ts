import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type61} from '../types/Type61';

export const Type61Guard = (type: t.Any): type is Type61 =>
  type instanceof t.InterfaceType && !!type.props['type61'];

export const Type61Api = createApi('Type61Api', Type61Guard, slice => {
  slice['doType61'] = () => 'Type61';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type61Api: TType extends t.InterfaceType<t.PropsOf<Type61>>
      ? {doType61: () => string}
      : never;
  }
}
