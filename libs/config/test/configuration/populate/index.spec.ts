import {Use} from '../../../src/configuration/decorators/Use';
import {Sources} from '../../../src/configuration/populate';
import {populate} from '../../../src/configuration/populate/populate';
import {TestSource} from '../../_tools/TestSource';

describe('populate', () => {
  class Settings {
    baseSetting = '';
  }

  describe('when default class is decorated with no readers', () => {
    it('returns a vanilla class instance', () => {
      const settings = populate([], Settings);
      expect(settings).toStrictEqual(new Settings());
    });
  });

  describe("when reader has properties that don't match the class properties", () => {
    it('should ignore them', () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            NonMatchingProperty: 'Foo',
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        Value = 'Default';
      }

      const settings = populate(sources, MySettings);
      expect(settings).toStrictEqual(new MySettings());
    });
  });

  describe('with two readers', () => {
    describe('and only the second has a value for the key', () => {
      it('returns the value from the second reader', () => {
        const sources: Sources = [
          ['ProcessEnv', new TestSource({})],
          [
            'ConfigFile',
            new TestSource({
              Value: 'ValueFromSecondReader',
            }),
          ],
        ];

        @Use('ProcessEnv', 'ConfigFile')
        class MySettings extends Settings {
          Value = '';
        }

        const settings = populate(sources, MySettings);
        expect(settings.Value).toBe('ValueFromSecondReader');
      });
    });

    describe('and both have a value for the same key', () => {
      it('returns the value from the first reader defined in sources', () => {
        const sources: Sources = [
          [
            'ProcessEnv',
            new TestSource({
              Value: 'ValueFromFirstReader',
            }),
          ],
          [
            'ConfigFile',
            new TestSource({
              Value: 'ValueFromSecondReader',
            }),
          ],
        ];

        @Use('ConfigFile', 'ProcessEnv')
        class MySettings extends Settings {
          Value = '';
        }

        const settings = populate(sources, MySettings);
        expect(settings.Value).toBe('ValueFromFirstReader');
      });
    });

    describe('and neither have a value for the key', () => {
      it('returns the default value', () => {
        const sources: Sources = [
          ['ProcessEnv', new TestSource({})],
          ['ConfigFile', new TestSource({})],
        ];

        @Use('ProcessEnv', 'ConfigFile')
        class MySettings extends Settings {
          Value = 'Default';
        }

        const settings = populate(sources, MySettings);
        expect(settings.Value).toBe('Default');
      });
    });
  });

  describe('with nested object', () => {
    it('returns nested value from source', () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            Value: {
              NestedValue: 'Foo',
            },
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        Value = new NestedSettings();
      }

      class NestedSettings {
        NestedValue = 'Default';
      }

      const settings = populate(sources, MySettings);
      const expected = new NestedSettings();
      expected.NestedValue = 'Foo';
      expect(settings.Value).toStrictEqual(expected);
    });

    it('returns nested value from source with getter', () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            Value: {
              NestedValue: 'Foo',
            },
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        _value = new NestedSettings();
        get Value() {
          return this._value;
        }
      }

      class NestedSettings {
        NestedValue = 'Default';
      }

      const settings = populate(sources, MySettings);
      const expected = new NestedSettings();
      expected.NestedValue = 'Foo';
      expect(settings.Value).toStrictEqual(expected);
    });

    it('returns default value when no nested value in source', () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            Value: {},
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        Value = new NestedSettings();
      }

      class NestedSettings {
        NestedValue = 'Default';
      }

      const settings = populate(sources, MySettings);
      const expected = new NestedSettings();
      expected.NestedValue = 'Default';
      expect(settings.Value).toStrictEqual(expected);
    });

    it('reads from source declared on property', () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            Value: {
              NestedValue: '',
            },
          }),
        ],
        [
          'ConfigFile',
          new TestSource({
            NestedValue: 'Foo',
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        @Use('ConfigFile')
        Value = new NestedSettings();
      }

      class NestedSettings {
        NestedValue = 'Default';
      }

      const settings = populate(sources, MySettings);
      const expected = new NestedSettings();
      expected.NestedValue = 'Foo';
      expect(settings.Value).toStrictEqual(expected);
    });

    it("reads from sources on property's class", () => {
      const sources: Sources = [
        [
          'ProcessEnv',
          new TestSource({
            Value: {},
          }),
        ],
        [
          'ConfigFile',
          new TestSource({
            NestedValue: 'Bar',
          }),
        ],
      ];

      @Use('ProcessEnv')
      class MySettings extends Settings {
        Value = new NestedSettings();
      }

      @Use('ConfigFile')
      class NestedSettings {
        NestedValue = 'Default';
      }

      const settings = populate(sources, MySettings);
      const expected = new NestedSettings();
      expected.NestedValue = 'Bar';
      expect(settings.Value).toStrictEqual(expected);
    });
  });
});
