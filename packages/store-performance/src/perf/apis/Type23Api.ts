import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type23} from '../types/Type23';

export const Type23Guard = (type: t.Any): type is Type23 =>
  type instanceof t.InterfaceType && !!type.props['type23'];

export const Type23Api = createApi('Type23Api', Type23Guard, slice => {
  slice['doType23'] = () => 'Type23';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type23Api: TType extends t.InterfaceType<t.PropsOf<Type23>>
      ? {doType23: () => string}
      : never;
  }
}
