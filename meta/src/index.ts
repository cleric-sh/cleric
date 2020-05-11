import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';

import {Nodes} from './spec/Nodes';
import {createSpec} from './spec/createSpec';
import {d} from './spec/directory/d';
import {f} from './spec/file/f';
import {tpl} from './spec/template/tpl/tpl';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsConfigContent = tsconfigJson`{
    "compilerOptions": {
        "noImplicitAny": false
    }
}`;

type MyArgs = {numbers: number[]; types?: ['user', 'organization']};

const Project = (args: MyArgs, children: Nodes) => [
  f('package.json', packageJsonContent),
  f('tsconfig.json', tsConfigContent),
  d('src', [...children]),
];

const Foo = (i: number) => f(`foo${i}.ts`, `Foo${i}`);
const Bar = (i: number) => f(`bar${i}.ts`, `Bar${i}`);

type CodeEntity = {
  code: string;
  key: string;
  properties: string[];
};

const ProjectSpec = (args: MyArgs) => [
  ...Project(args, [d('foos', [...args.numbers.map(Foo)])]),
];

generate(
  '~/Projects/experiments/output',
  ProjectSpec({numbers: [...Array(5).keys()].map(i => i + 1)}),
  true
);

const [_spec, refs] = createSpec((args: MyArgs) => [
  d('src', [
    f(
      'bar.ts',
      tpl`bar: ${tpl('bar')` ${tpl('baz')` baz`}`}, bar: ${() => refs.foo}`
    ),
    f('foo.ts', tpl`foo: ${tpl('foo')``}, bar: ${() => refs.bar.baz}`),
  ]),
]);
