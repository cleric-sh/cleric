import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {Type9} from '../types/Type9';

export const Type9Guard = (type: t.Any): type is Type9 =>
  type instanceof t.InterfaceType && !!type.props['type9'];

export const Type9Api = createApi('Type9Api', Type9Guard, slice => {
  slice['doType9'] = () => 'Type9';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Type9Api: TType extends t.InterfaceType<t.PropsOf<Type9>>
      ? {doType9: () => string}
      : never;
  }
}
