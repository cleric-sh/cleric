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

type Args = {foos: number[]};

const Project = (args: Args, children: Nodes) => [
  f('package.json', packageJsonContent),
  f('tsconfig.json', tsConfigContent),
  d('src', [...children]),
];

const Foo = (i: number) => f(`foo${i}.ts`, `Foo${i}`);

const Spec = (args: Args) => [
  ...Project(args, [
    ...args.foos.map(Foo),
    d('nested-dir', [
      f('testing.json', 'foo'),
      f('testing2.json', 'foo'),
      f('testing3.json', 'foo'),
    ]),
  ]),
];

generate('~/Projects/experiments/output', Spec({foos: [1, 2, 3, 4, 5]}));
