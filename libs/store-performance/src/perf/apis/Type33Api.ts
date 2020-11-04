import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type33} from '../types/Type33';

export const Type33Guard = (type: t.Any): type is Type33 =>
  type instanceof t.InterfaceType && !!type.props['type33'];

export const Type33Api = createApi('Type33Api', Type33Guard, slice => {
  slice['doType33'] = () => 'Type33';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type33Api: TType extends t.InterfaceType<t.PropsOf<Type33>>
      ? {doType33: () => string}
      : never;
  }
}
