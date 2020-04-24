import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type98} from '../types/Type98';

export const Type98Guard = (type: t.Any): type is Type98 =>
  type instanceof t.InterfaceType && !!type.props['type98'];

export const Type98Api = createApi('Type98Api', Type98Guard, slice => {
  slice['doType98'] = () => 'Type98';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type98Api: TType extends t.InterfaceType<t.PropsOf<Type98>>
      ? {doType98: () => string}
      : never;
  }
}
