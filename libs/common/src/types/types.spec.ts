import {
  FilterExclude,
  FilterInclude,
  KeysNotOfType,
  KeysOfArrays,
  KeysOfType,
  TypesOfKeys,
} from './types';

interface Foo {
  arrBar: number[];
  arrFoo: string[];
  bar: number;
  blah: Date;
  foo: string;
}

describe('TypesOfKeys', () => {
  it('defines types of keys', () => {
    const allowString: TypesOfKeys<Foo> = 'blah';
    const allowNumber: TypesOfKeys<Foo> = 2;
    const allowDate: TypesOfKeys<Foo> = new Date();
    // const errorElse: TypesOfKeys<IFoo> = {};
  });
});

describe('KeysOfType', () => {
  it('defines keys matching type specified', () => {
    const allowBar: KeysOfType<Foo, number> = 'bar';
    // const errorFoo: KeysOfType<IFoo, number> = 'foo';
  });
});

describe('KeysNotOfType', () => {
  it('defines keys matching type specified', () => {
    const allowBar: KeysNotOfType<Foo, number> = 'foo';
    // const errorFoo: KeysOfType<IFoo, number> = 'blah';
  });
});

describe('KeysOfArrays', () => {
  it('defines keys which are Array', () => {
    const allowArrFoo: KeysOfArrays<Foo> = 'arrFoo';
    const allowArrBar: KeysOfArrays<Foo> = 'arrBar';
    // const errorFoo: KeysOfArrays<IFoo> = 'foo'
  });
});

describe('Filter', () => {
  it('defines type with properties that extend from Type', () => {
    interface Blah {
      five: Date;
      four: string;
      one: number;
      six: Date;
      three: string;
      two: number;
    }
    const filtered: FilterInclude<Blah, Date | number> = {
      // three: 'three',
      // four: 'four',
      five: new Date(),
      one: 1,
      six: new Date(),
      two: 2,
    };
  });
});

describe('Exclude', () => {
  it('defines type with properties except those that extend from Type', () => {
    interface Blah {
      five: Date;
      four: string;
      one: number;
      six: Date;
      three: string;
      two: number;
    }
    const excluded: FilterExclude<Blah, Date | number> = {
      // one: 1,
      // two: 2,
      four: 'four',
      three: 'three',
      // five: new Date(),
      // six: new Date()
    };
  });
});
