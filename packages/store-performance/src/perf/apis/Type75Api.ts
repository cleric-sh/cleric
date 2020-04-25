import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type75} from '../types/Type75';

export const Type75Guard = (type: t.Any): type is Type75 =>
  type instanceof t.InterfaceType && !!type.props['type75'];

export const Type75Api = createApi('Type75Api', Type75Guard, slice => {
  slice['doType75'] = () => 'Type75';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type75Api: TType extends t.InterfaceType<t.PropsOf<Type75>>
      ? {doType75: () => string}
      : never;
  }
}
