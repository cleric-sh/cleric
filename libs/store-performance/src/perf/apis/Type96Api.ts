import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type96} from '../types/Type96';

export const Type96Guard = (type: t.Any): type is Type96 =>
  type instanceof t.InterfaceType && !!type.props['type96'];

export const Type96Api = createApi('Type96Api', Type96Guard, slice => {
  slice['doType96'] = () => 'Type96';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type96Api: TType extends t.InterfaceType<t.PropsOf<Type96>>
      ? {doType96: () => string}
      : never;
  }
}
