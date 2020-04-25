import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type17} from '../types/Type17';

export const Type17Guard = (type: t.Any): type is Type17 =>
  type instanceof t.InterfaceType && !!type.props['type17'];

export const Type17Api = createApi('Type17Api', Type17Guard, slice => {
  slice['doType17'] = () => 'Type17';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type17Api: TType extends t.InterfaceType<t.PropsOf<Type17>>
      ? {doType17: () => string}
      : never;
  }
}
