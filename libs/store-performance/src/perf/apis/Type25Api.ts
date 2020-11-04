import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type25} from '../types/Type25';

export const Type25Guard = (type: t.Any): type is Type25 =>
  type instanceof t.InterfaceType && !!type.props['type25'];

export const Type25Api = createApi('Type25Api', Type25Guard, slice => {
  slice['doType25'] = () => 'Type25';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type25Api: TType extends t.InterfaceType<t.PropsOf<Type25>>
      ? {doType25: () => string}
      : never;
  }
}
