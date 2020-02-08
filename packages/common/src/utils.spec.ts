import {
  TypesOfKeys,
  KeysOfType,
  KeysOfArrays,
  FilterInclude,
  KeysNotOfType,
  FilterExclude,
  DeepPartial,
} from './utils';

interface IFoo {
  foo: string;
  bar: number;
  blah: Date;
  arrFoo: string[];
  arrBar: number[];
}

describe('TypesOfKeys', () => {
  it('defines types of keys', () => {
    const allowString: TypesOfKeys<IFoo> = 'blah';
    const allowNumber: TypesOfKeys<IFoo> = 2;
    const allowDate: TypesOfKeys<IFoo> = new Date();
    // const errorElse: TypesOfKeys<IFoo> = {};
  });
});

describe('KeysOfType', () => {
  it('defines keys matching type specified', () => {
    const allowBar: KeysOfType<IFoo, number> = 'bar';
    // const errorFoo: KeysOfType<IFoo, number> = 'foo';
  });
});

describe('KeysNotOfType', () => {
  it('defines keys matching type specified', () => {
    const allowBar: KeysNotOfType<IFoo, number> = 'foo';
    // const errorFoo: KeysOfType<IFoo, number> = 'blah';
  });
});

describe('KeysOfArrays', () => {
  it('defines keys which are Array', () => {
    const allowArrFoo: KeysOfArrays<IFoo> = 'arrFoo';
    const allowArrBar: KeysOfArrays<IFoo> = 'arrBar';
    // const errorFoo: KeysOfArrays<IFoo> = 'foo'
  });
});

describe('Filter', () => {
  it('defines type with properties that extend from Type', () => {
    interface IBlah {
      one: number;
      two: number;
      three: string;
      four: string;
      five: Date;
      six: Date;
    }
    const filtered: FilterInclude<IBlah, Date | number> = {
      one: 1,
      two: 2,
      // three: 'three',
      // four: 'four',
      five: new Date(),
      six: new Date(),
    };
  });
});

describe('Exclude', () => {
  it('defines type with properties except those that extend from Type', () => {
    interface IBlah {
      one: number;
      two: number;
      three: string;
      four: string;
      five: Date;
      six: Date;
    }
    const excluded: FilterExclude<IBlah, Date | number> = {
      // one: 1,
      // two: 2,
      three: 'three',
      four: 'four',
      // five: new Date(),
      // six: new Date()
    };
  });
});

describe('DeepPartial', () => {
  type MyState = {
    something: {
      nested: {};
      secondNested: {};
    };
    another: {};
  };

  it('allows partial of root and nested values', () => {
    const value: DeepPartial<MyState> = {
      something: {
        nested: {},
      },
    };
  });
});
