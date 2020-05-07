import {f} from '../../spec/file/f';
export const Type = (i: number) => {
  const typeName = `Type${i}`;
  const _typeName = typeName.toLowerCase();
  return f(
    `${typeName}.ts`,
    `import * as t from 'io-ts';

export const ${_typeName} = t.type({
  ${_typeName}: t.string,
});

export type ${typeName} = typeof ${_typeName};
`
  );
};
