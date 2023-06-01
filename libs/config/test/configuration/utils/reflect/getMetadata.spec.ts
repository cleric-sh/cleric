import {getMetadata} from '../../../../src/configuration/utils/reflect/getMetadata';

describe('getMetadata', () => {
  it('returns decorator of class constructor', () => {
    @Reflect.metadata('KEY', 'VALUE')
    class MyClass {}

    const value = getMetadata('KEY', MyClass);
    expect(value).toBe('VALUE');
  });

  it('returns decorator of class instance', () => {
    @Reflect.metadata('KEY', 'VALUE')
    class MyClass {}

    const value = getMetadata('KEY', new MyClass());
    expect(value).toBe('VALUE');
  });

  it('returns decorator of instance property', () => {
    class MyClass {
      @Reflect.metadata('KEY', 'VALUE')
      myProperty = '';
    }

    const value = getMetadata('KEY', new MyClass(), 'myProperty');
    expect(value).toBe('VALUE');
  });
});
