import {f} from '../../spec/file/f';
export const Api = (i: number) => {
  const typeName = `Type${i}`;
  return f(
    `${typeName}Api.ts`,
    `import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {${typeName}} from '../types/${typeName}';

export const ${typeName}Guard = (type: t.Any): type is ${typeName} =>
  type instanceof t.InterfaceType && !!type.props['${typeName.toLowerCase()}'];

export const ${typeName}Api = createApi('${typeName}Api', ${typeName}Guard, slice => {
  slice['do${typeName}'] = () => '${typeName}';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    ${typeName}Api: TType extends t.InterfaceType<t.PropsOf<${typeName}>>
      ? {do${typeName}: () => string}
      : never;
  }
}
`
  );
};
