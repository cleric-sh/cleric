import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type60} from '../types/Type60';

export const Type60Guard = (type: t.Any): type is Type60 =>
  type instanceof t.InterfaceType && !!type.props['type60'];

export const Type60Api = createApi('Type60Api', Type60Guard, slice => {
  slice['doType60'] = () => 'Type60';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type60Api: TType extends t.InterfaceType<t.PropsOf<Type60>>
      ? {doType60: () => string}
      : never;
  }
}
