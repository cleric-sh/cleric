import {Pass, check, checks} from '@cleric/common';
import {KeyedTemplate} from './KeyedTemplate';
import {UnkeyedTemplate} from './UnkeyedTemplate';

describe('UnkeyedTemplate', () => {
  it('passes through exports of placeholders', () => {
    type baz = KeyedTemplate<'baz', []>;

    type foo = KeyedTemplate<'foo', []>;
    type bar = KeyedTemplate<'bar', [baz]>;

    type actual = UnkeyedTemplate<[foo, bar]>['exports'];

    type expected = {
      bar: {
        baz: {};
      };
      foo: {};
    };

    checks([check<actual, expected, Pass>()]);
  });
});
