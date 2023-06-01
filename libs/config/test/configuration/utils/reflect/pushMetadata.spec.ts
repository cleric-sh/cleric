import {pushMetadata} from '../../../../src/configuration/utils/reflect/pushMetadata';

const KEY = 'KEY';

describe('accumulateMetadata', () => {
  it('accumulates class decorator values on the same key as an array', () => {
    @pushMetadata(KEY, '1')
    @pushMetadata(KEY, '2')
    class MyClass {}

    const readers = Reflect.getMetadata(KEY, MyClass);
    expect(readers).toStrictEqual(['1', '2']);
  });

  it('accumulates class decorator values on the same key as an array', () => {
    @pushMetadata(KEY, '1')
    @pushMetadata(KEY, '2')
    class MyClass {}

    const readers = Reflect.getMetadata(KEY, new MyClass().constructor);
    expect(readers).toStrictEqual(['1', '2']);
  });

  it('accumulates property decorator values on the same key as an array', () => {
    class MyClass {
      @pushMetadata(KEY, '1')
      @pushMetadata(KEY, '2')
      myProp = '';
    }

    const readers = Reflect.getMetadata(KEY, new MyClass(), 'myProp');
    expect(readers).toStrictEqual(['1', '2']);
  });
});
