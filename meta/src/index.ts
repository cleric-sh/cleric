import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {Nodes} from './spec/Nodes';
import {d} from './spec/d';
import {f} from './spec/f';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsConfigContent = tsconfigJson`{
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

const Spec = (args: Args) => [
  ...Project(args, [d('foos', [...args.numbers.map(Foo)])]),
];

generate(
  '~/Projects/experiments/output',
  Spec({numbers: [...Array(5).keys()].map(i => i + 1)}),
  true
);
