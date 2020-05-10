import {Pass, check, checks} from '@cleric/common';
import {KeyedTemplate} from './KeyedTemplate';

describe('KeyedTemplate', () => {
  it('should nest exports underneath own key', () => {
    type baz = KeyedTemplate<'baz', []>;

    type foo = KeyedTemplate<'foo', []>;
    type bar = KeyedTemplate<'bar', [baz]>;

    type actual = KeyedTemplate<'top', [foo, bar]>['exports'];

    type expected = {
      top: {
        bar: {
          baz: {};
        };
        foo: {};
      };
    };

    checks([check<actual, expected, Pass>()]);
  });
});
