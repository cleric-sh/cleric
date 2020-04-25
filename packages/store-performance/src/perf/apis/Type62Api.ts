import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type62} from '../types/Type62';

export const Type62Guard = (type: t.Any): type is Type62 =>
  type instanceof t.InterfaceType && !!type.props['type62'];

export const Type62Api = createApi('Type62Api', Type62Guard, slice => {
  slice['doType62'] = () => 'Type62';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type62Api: TType extends t.InterfaceType<t.PropsOf<Type62>>
      ? {doType62: () => string}
      : never;
  }
}
