import {Clean, Compute} from 'Any/_api';
import {PromiseOf} from 'Class/_api';
import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {Export} from './spec/Export';
import {Nodes} from './spec/Nodes';
import {Spec} from './spec/Spec';
import {_SpecExports} from './spec/SpecExports';
import {d} from './spec/directory/d';
import {f} from './spec/file/f';
import {Placeholder} from './spec/template/Placeholder';
import {TemplateExports} from './spec/template/TemplateExports';
import {tpl} from './spec/template/tpl/tpl';
import {MaybePromise} from './util/MaybePromise';

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

const tag = async <TPhs extends Placeholder[]>(
  value: TemplateStringsArray,
  ...placeholders: TPhs
) => {
  let result = '';

  // wait for all the placeholder dependencies to resolve
  const placeholderValues = await Promise.all(placeholders);

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += value[i];
    result += placeholderValues[i];
  }

  // add the last literal (empty string if there is a final literal value)
  result += value[value.length - 1];

  return result as TemplateExports<TPhs>;
};

const export_ = <T extends string>(name: T) =>
  ({__type: 'Export', name} as Export<T>);

type CreateSpec = <TSpec extends Spec>(
  spec: TSpec
) => [TSpec, _SpecExports<TSpec>];

const createSpec: CreateSpec = spec => {
  return [spec, {} as any];
};

const [_spec, refs] = createSpec((args: MyArgs) => [
  tpl`foo: ${tpl('foo')``}, bar: ${() => refs[1].bar.baz}`,
  tpl`bar: ${tpl('bar')` ${tpl('baz')` baz`}`}, bar: ${() => refs[0].foo}`,
]);

const test = async () => {
  const bar = tpl('bar')` bing`;
  const foo = tpl('foo')` bar ${bar} `;
  const baz = await tpl` narf ${foo}`;
};
