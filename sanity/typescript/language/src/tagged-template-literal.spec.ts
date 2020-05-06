import {Cast} from 'Any/Cast';
import {Clean, Compute} from 'Any/_api';
import {AtStrict} from 'Object/At';
import {Strict} from 'Union/_api';
import {never} from 'rxjs';
import {O, Object, T, Tuple, Union} from 'ts-toolbelt';

const _ = (value: string) => (async () => await value)();

const asyncTag = async (
  value: TemplateStringsArray,
  ...placeholders: (Promise<string> | string)[]
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

  return result;
};

describe('tagged template literals', () => {
  it('can also operate async', async () => {
    const _foo = _('foo');
    const _bar = _('bar');
    const _testFoo = asyncTag`test${_foo}`;
    const _testBar = asyncTag`test${_bar}`;
    const _fooBar = asyncTag`${_testFoo}:${_testBar} ${_foo}${_bar}`;

    const fooBar = await _fooBar;

    console.log(fooBar);
    expect(fooBar).toBe(`testfoo:testbar foobar`);
  });

  it('can also operate a mix of sync and async', async () => {
    const test = 'test';
    const _foo = _('foo');
    const _bar = _('bar');
    const _testFoo = asyncTag`${test}${_foo}`;
    const _testBar = asyncTag`${test}${_bar}`;
    const _fooBar = asyncTag`${_testFoo}:${_testBar} ${_foo}${_bar}`;

    const fooBar = await _fooBar;

    console.log(fooBar);
    expect(fooBar).toBe(`testfoo:testbar foobar`);
  });

  it('can also handle a single string without overload', async () => {
    const _foo = asyncTag`foo`;

    const foo = await _foo;
    console.log(foo);
    expect(foo).toBe('foo');
  });

  it('can infer generic types of placeholders', async () => {
    type Sym<T extends string> = {name: T};
    type Ph<T> = Promise<T> | T;
    type Phs = Ph<Sym<string>>[];

    type Out<TPhs extends Phs> = Union.Merge<
      Tuple.UnionOf<
        {
          [P in keyof TPhs]: TPhs[P] extends Ph<Sym<infer N>>
            ? {
                [K in Cast<N, string | symbol | number>]: TPhs[P];
              }
            : never;
        }
      >
    >;

    const tag = async <TPhs extends Phs>(
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

      return result as Out<TPhs>;
    };

    const exp = <T extends string>(name: T) => ({name} as Sym<T>);

    const blah = await tag`foo: ${exp('foo')}, bar: ${exp('bar')}`;

    console.log(blah);
  });
});
