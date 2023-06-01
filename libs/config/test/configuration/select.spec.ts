import {select} from '../../src/configuration/select';

import {throws} from 'assert';
import {ConfigurationError} from '../../src/configuration/errors/ConfigurationError';
import {Fail, Pass, checkExtends, checks} from '../_tools/ts-toolbelt/Test';

describe('select', () => {
  it('allows selecting class properties', () => {
    class Config {
      myKey = 'foo';
      notWanted = 'bar';
    }

    const config = new Config();
    const [selected] = select(config, {myKey: true});

    // Ensure returned type only contains selected properties.
    checks([checkExtends<typeof selected, {myKey: string}, Pass>()]);

    // Ensure returned instance only contains selected properties.
    expect(selected).toStrictEqual({
      myKey: 'foo',
    });
  });

  it('throws ConfigurationError when a required key has no value', () => {
    class Config {
      myKey = '';
    }

    const config = new Config();
    expect(() => {
      select(config, {myKey: true});
    }).toThrowError(
      new ConfigurationError(
        "Configuration setting 'myKey' was required but not provided by any source."
      )
    );
  });

  it('allows no value when a selected key is not required', () => {
    class Config {
      myKey = '';
    }

    const config = new Config();
    const [selected] = select(config, {myKey: false});

    // Ensure returned type only contains selected properties.
    checks([checkExtends<typeof selected, {myKey: string}, Pass>()]);

    // Ensure returned instance only contains selected properties.
    expect(selected).toStrictEqual({
      myKey: '',
    });
  });

  it('allows selecting nested class properties', () => {
    class Config {
      myKey = 'foo';
      nested = new NestedConfig();
    }

    class NestedConfig {
      myKey = 'bar';
      nested = new SubNestedConfig();
    }

    class SubNestedConfig {
      myKey = 'baz';
    }

    const config = new Config();
    const [selected] = select(config, {
      myKey: true,
      nested: {
        myKey: true,
        nested: {
          myKey: true,
        },
      },
    });

    // Ensure returned type only contains selected properties.
    checks([checkExtends<typeof selected, {myKey: string}, Pass>()]);

    // Ensure returned instance only contains selected properties.
    expect(selected).toStrictEqual({
      myKey: 'foo',
      nested: {
        myKey: 'bar',
        nested: {
          myKey: 'baz',
        },
      },
    });
  });

  it('allows selecting get accessor', () => {
    class Config {
      get myKey() {
        return 'foo';
      }
    }

    const config = new Config();
    const [selected] = select(config, {myKey: true});

    // Ensure returned type only contains selected properties.
    checks([checkExtends<typeof selected, {myKey: string}, Pass>()]);

    // Ensure returned instance only contains selected properties.
    expect(selected).toStrictEqual({
      myKey: 'foo',
    });
  });

  it('allows selecting only keys of public properties', () => {
    class Config {
      public myFirstKey = 'foo';
      public get mySecondKey() {
        return 'bar';
      }
      private myThirdKey = 'baz';
    }

    const config = new Config();

    // Ensure 'selectedKeys' argument can only accept public properties of 'Config'.
    checks([
      checkExtends<['myFirstKey', 'mySecondKey'], Array<keyof Config>, Pass>(),
      checkExtends<['myThirdKey'], Array<keyof Config>, Fail>(),
    ]);

    const [selected] = select(config, {myFirstKey: true, mySecondKey: true});

    // Ensure returned type only contains the properties selected.
    checks([checkExtends<typeof selected, {myFirstKey: string; mySecondKey: string}, Pass>()]);

    // Ensure returned instance only contains selected properties and their values.
    expect(selected).toStrictEqual({
      myFirstKey: 'foo',
      mySecondKey: 'bar',
    });
  });
});
