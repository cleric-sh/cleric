import {Fail, Pass, check, checks} from '@cleric/common';
import {Placeholder} from './Placeholder';
import {Template} from './Template';

describe('Placeholder', () => {
  it('should do stuff', () => {
    type actual = {};
    type expected = {};

    type KeyedTemplate = Template<'foo', Placeholder[]>;
    type UnkeyedTemplate = Template<never, Placeholder[]>;

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
