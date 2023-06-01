import {USE_METADATA_KEY} from '../../../src/configuration/decorators/Use';
import {getSourcePaths} from '../../../src/configuration/populate/getSourcePaths';

describe('getSourcePaths', () => {
  const TestSources = ['Foo', 'Bar'];

  describe('from class', () => {
    it('returns empty object when no sources', () => {
      class MyClass {}

      const sources = getSourcePaths(MyClass);
      expect(sources).toStrictEqual({});
    });

    it('returns array of sources defined on class', () => {
      @Reflect.metadata(USE_METADATA_KEY, TestSources)
      class MyClass {}

      const sources = getSourcePaths(MyClass);
      expect(sources).toStrictEqual({
        Bar: [],
        Foo: [],
      });
    });
  });

  describe('from instance', () => {
    it('returns undefined when no sources', () => {
      class MyClass {}

      const sources = getSourcePaths(new MyClass());
      expect(sources).toStrictEqual({});
    });

    it('returns array of sources defined on class', () => {
      @Reflect.metadata(USE_METADATA_KEY, TestSources)
      class MyClass {}

      const sources = getSourcePaths(new MyClass());
      expect(sources).toStrictEqual({
        Bar: [],
        Foo: [],
      });
    });
  });

  describe('from property', () => {
    it('returns undefined when no sources', () => {
      @Reflect.metadata(USE_METADATA_KEY, TestSources)
      class MyClass {
        myProp = '';
      }

      const myClass = new MyClass();
      const sources = getSourcePaths(myClass, 'myProp');
      expect(sources).toStrictEqual({});
    });

    it('returns array of sources defined on property', () => {
      class MyClass {
        @Reflect.metadata(USE_METADATA_KEY, TestSources)
        myProp = '';
      }

      const myClass = new MyClass();
      const sources = getSourcePaths(myClass, 'myProp');
      expect(sources).toStrictEqual({
        Bar: [],
        Foo: [],
      });
    });
  });
});
