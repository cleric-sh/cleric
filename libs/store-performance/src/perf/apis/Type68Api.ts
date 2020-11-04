import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type68} from '../types/Type68';

export const Type68Guard = (type: t.Any): type is Type68 =>
  type instanceof t.InterfaceType && !!type.props['type68'];

export const Type68Api = createApi('Type68Api', Type68Guard, slice => {
  slice['doType68'] = () => 'Type68';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type68Api: TType extends t.InterfaceType<t.PropsOf<Type68>>
      ? {doType68: () => string}
      : never;
  }
}
