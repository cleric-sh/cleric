import {f} from '../../spec/file/f';
export const Root = (numbers: number[]) => {
  const imports = numbers
    .map(i => `import {type${i}, Type${i}} from './Type${i}';`)
    .join(`\n`);
  const propValues = numbers.map(i => `type${i}: t.TypeOf<Type${i}>;`).join(``);
  const propTypes = numbers.map(i => `type${i}: Type${i};`).join(``);
  const props = numbers.map(i => `type${i},`).join(``);
  return f(
    `Root.ts`,
    `import * as t from 'io-ts';

    ${imports}
    
    interface RootValue {
      root: RootValue;
      ${propValues}
    }
    
    export type Root = t.RecursiveType<
      t.TypeC<{
        root: Root;
        ${propTypes}
      }>,
      RootValue
    >;
    
    export const root: Root = t.recursion('Root', () =>
      t.type({
        root,
        ${props}
      })
    );
    
`
  );
};
