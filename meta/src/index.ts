import {foo} from './foo';
import {generate} from './generate';
import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';
import {Nodes} from './spec/Nodes';
import {Spec} from './spec/Spec';
import {createSpec} from './spec/createSpec';
import {d} from './spec/directory/d';
import {f} from './spec/file/f';
import {t} from './spec/template/t';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsConfigContent = tsconfigJson`{
    "compilerOptions": {
        "noImplicitAny": false
    }
}`;

type CreateComponent = {
  <TSpec extends Spec>(spec: TSpec): (
    ...args: Parameters<TSpec>
  ) => ReturnType<TSpec>;
};

const createComponent: CreateComponent = spec => spec() as any;

const Project = createComponent((args: MyArgs, children: Nodes) => [
  f('package.json', packageJsonContent),
  f('tsconfig.json', tsConfigContent),
  d('src', [...children]),
]);

const Foo = (i: number) => f(`foo${i}.ts`, `Foo${i}`);
const Bar = (i: number) => f(`bar${i}.ts`, `Bar${i}`);

type MyArgs = {numbers: number[]; types?: ['user', 'organization']};

const baz = t('baz')` baz`;
const bar = t`bar: ${t('bar')` ${baz}`}, bar: ${() => refs.foo}`;

export const [spec, refs] = createSpec((args: MyArgs) => [
  ...Project(args, [d('foos', [...args.numbers.map(Foo)])]),
  d('src', [f('bar.ts', bar), f('foo.ts', foo)]),
  f('baz.ts', baz),
]);

generate(
  '~/Projects/experiments/output',
  spec({numbers: [...Array(5).keys()].map(i => i + 1)}),
  true
);

// typescript-estree: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/typescript-estree
// fuse-box estree visitor pattern: https://github.com/fuse-box/fuse-box/blob/060793f2e41b7b2718734cd00f206d9cb6380784/src/compiler/core/transformModule.ts#L12
// usage: https://github.com/fuse-box/fuse-box/blob/060793f2e41b7b2718734cd00f206d9cb6380784/src/compiler/transformers/bundle/BrowserProcessTransformer.ts#L60
