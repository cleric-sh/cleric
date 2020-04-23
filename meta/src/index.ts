import rimraf from 'rimraf';
import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {Nodes} from './spec/Nodes';
import {d} from './spec/d';
import {f} from './spec/f';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsConfigContent = tsconfigJson`
{
    "compilerOptions": {
        "noImplicitAny": false
    }
}`;

type Args = {numbers: number[]};

const Project = (args: Args, children: Nodes) => [
  f('package.json', packageJsonContent),
  f('tsconfig.json', tsConfigContent),
  d('src', [...children]),
];

const Foo = (i: number) => f(`foo${i}.ts`, `Foo${i}`);

type CodeEntity = {
  code: string;
  key: string;
  properties: string[];
};

const Type = (i: number) => {
  const typeName = `Type${i}`;
  return f(
    `${typeName}.ts`,
    `import * as t from 'io-ts';

  export const foo = t.type({
    foo: t.string,
  });
  
  export type Foo = typeof foo;
  `
  );
};

const Api = (i: number) => {
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

const Config = (numbers: number[]) => {
  const imports = numbers
    .map(i => `  import {Type${i}Api} from './apis/Type${i}Api';`)
    .join('\n');

  const apis = numbers.map(i => `Type${i}Api`).join(', ');

  return f(
    `PerfConfig.ts`,
    `
  import {createConfig} from '@cleric/store-experimental/src/config';
  
${imports}
  
  export const PerfConfig = createConfig('Perf', {
    apis: [${apis}],
    slice: 'PerfSlice',
  });
  
  declare module '@cleric/store-experimental/src/config' {
    export interface ConfigTypes {
      Perf: typeof PerfConfig;
    }
  }
  
  `
  );
};

const Spec = (args: Args) => [
  d('types', [...args.numbers.map(Type)]),
  d('apis', [...args.numbers.map(Api)]),
  Config(args.numbers),
];

generate(
  '~/Projects/experiments/output',
  Spec({numbers: [...Array(5).keys()].map(i => i + 1)}),
  false
);
