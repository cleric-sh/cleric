import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type20} from '../types/Type20';

export const Type20Guard = (type: t.Any): type is Type20 =>
  type instanceof t.InterfaceType && !!type.props['type20'];

export const Type20Api = createApi('Type20Api', Type20Guard, slice => {
  slice['doType20'] = () => 'Type20';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type20Api: TType extends t.InterfaceType<t.PropsOf<Type20>>
      ? {doType20: () => string}
      : never;
  }
}
