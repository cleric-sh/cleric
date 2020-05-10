import {Pass, check, checks} from '@cleric/common';
import {KeyedTemplate} from './KeyedTemplate';
import {PlaceholderExports} from './PlaceholderExports';

describe('PlaceholderExports', () => {
  it('should do stuff', () => {
    type foo = KeyedTemplate<'foo', []>;
    type bar = KeyedTemplate<'bar', []>;
    type Phs = [foo, string, bar, () => {}];
    type actual = PlaceholderExports<Phs>;
    type expected = {
      bar: {};
      foo: {};
    };

    checks([check<actual, expected, Pass>()]);
  });
});
