import {Fail, Pass, check, checks} from '@cleric/common';
import {KeyedTemplate as _KeyedTemplate} from './KeyedTemplate';
import {Placeholder} from './Placeholder';
import {UnkeyedTemplate as _UnkeyedTemplate} from './UnkeyedTemplate';

describe('Placeholder', () => {
  it('should do stuff', () => {
    type KeyedTemplate = _KeyedTemplate<'foo', Placeholder[]>;
    type UnkeyedTemplate = _UnkeyedTemplate<Placeholder[]>;

    checks([
      check.extends<Function, Placeholder, Pass>(),
      check.extends<KeyedTemplate, Placeholder, Pass>(),
      check.extends<UnkeyedTemplate, Placeholder, Pass>(),
      check.extends<string, Placeholder, Pass>(),
      check.extends<Promise<Function>, Placeholder, Pass>(),
      check.extends<Promise<KeyedTemplate>, Placeholder, Pass>(),
      check.extends<Promise<UnkeyedTemplate>, Placeholder, Pass>(),
      check.extends<Promise<string>, Placeholder, Pass>(),
      check.extends<{}, Placeholder, Fail>(),
      check.extends<Promise<{}>, Placeholder, Fail>(),
    ]);
  });
});
