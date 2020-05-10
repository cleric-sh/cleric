import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';

import {createSpec} from './createSpec';
import {Nodes} from './spec/Nodes';
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
  tpl`foo: ${tpl('foo')``}, bar: ${() => refs[1].bar.baz}`,
  tpl`bar: ${tpl('bar')` ${tpl('baz')` baz`}`}, bar: ${() => refs[0].foo}`,
]);
