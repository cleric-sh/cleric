import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {generate} from './generate';
import {f} from './spec/f';
import {d} from './spec/d';
import {Nodes} from './spec/Nodes';

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

const Foos = (foos: number[]) => foos.map(i => f(`foo${i}.ts`, `Foo${i}`));

const Spec = (args: Args) => [
  ...Project(args, [
    ...Foos(args.foos),
    d('nested-dir', [
      f('testing.json', 'foo'),
      f('testing2.json', 'foo'),
      f('testing3.json', 'foo'),
    ]),
  ]),
];

generate('~/Projects/experiments/output', Spec({foos: [1, 2, 3, 4, 5]}));
