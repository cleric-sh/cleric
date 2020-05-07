import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {Export} from './spec/Export';
import {_ImportsOf} from './spec/ImportsOf';
import {Nodes} from './spec/Nodes';
import {Spec} from './spec/Spec';
import {d} from './spec/directory/d';
import {f} from './spec/file/f';
import {Placeholder} from './spec/template/Placeholder';
import {TemplateExports} from './spec/template/TemplateExports';

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
) => [TSpec, _ImportsOf<TSpec>];

const createSpec: CreateSpec = spec => {
  return [spec, {} as any];
};

const [_spec, refs] = createSpec((args: MyArgs) => [
  tag`foo: ${export_('foo')}, bar: ${() => refs[1].bar}`,
  tag`bar: ${export_('bar')}, bar: ${() => refs[0].foo}`,
]);

type Template<TPhs extends Placeholder[]> = {
  __type: 'Template';
  exports: TemplateExports<TPhs>;
};

export type File = {
  <TPhs extends Placeholder[]>(
    value: TemplateStringsArray,
    ...placeholders: TPhs
  ): Promise<Template<TPhs>>;
};

export const file: File = async (value, ...placeholders) => {
  const placeholderValues = await Promise.all(placeholders);

  let result = '';

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += value[i];
    result += placeholderValues[i];
  }

  // add the last literal
  result += value[value.length - 1];
  return result as any; // Remove any, use correct return type.
};
