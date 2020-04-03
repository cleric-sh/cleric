import {performance} from 'perf_hooks';
import {createHash} from './createHash';
import {updateHash} from './updateHash';

describe('hash', () => {
  it('should support arrays', () => {
    const first = createHash({
      arr: ['testing'],
    });

    const second = createHash({
      arr: ['testing2'],
    });

    expect(first.__hash).not.toBe(second.__hash);

    const third = createHash({
      arr: ['testing'],
    });

    expect(first.__hash).toBe(third.__hash);
  });

  it('should give different root hash if value in nested scalar changes', () => {
    const first = createHash({
      firstVal: 'foo',
      secondVal: {
        nestedVal: 3,
      },
    }).__hash;

    const second = createHash({
      firstVal: 'foo',
      secondVal: {
        nestedVal: 4,
      },
    }).__hash;

    expect(first).not.toBe(second);

    const third = createHash({
      firstVal: 'foo',
      secondVal: {
        nestedVal: 3,
      },
    }).__hash;

    expect(first).toBe(third);
  });

  it('should allow hashing boolean values', () => {
    type MyState = {
      value: boolean;
      nested: {
        anotherValue: string;
        thirdValue: boolean;
      };
    };

    const first = createHash<MyState>({
      nested: {
        anotherValue: 'TEST',
        thirdValue: false,
      },
      value: true,
    });
    const firstHash = first.__hash;
    console.log(first);
    expect(firstHash).not.toBe(0);

    const second = updateHash(first, ['value'], false);
    const secondHash = second.__hash;
    console.log(second);
    expect(firstHash).not.toBe(secondHash);

    const third = updateHash(first, ['value'], true);
    const thirdHash = third.__hash;
    console.log(third);
    expect(thirdHash).toBe(firstHash);

    const fourth = updateHash(first, ['nested', 'thirdValue'], true);
    const fourthHash = fourth.__hash;
    console.log(fourth);
    expect(firstHash).not.toBe(fourthHash);

    const fifth = updateHash(first, ['nested', 'thirdValue'], false);
    const fifthHash = fifth.__hash;
    console.log(fifth);
    expect(thirdHash).toBe(fifthHash);
  });

  it('should allow setting sub-property on undefined hash value', () => {
    type MyState = {
      nested: string;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const first = createHash<MyState>((undefined as any) as MyState);
    expect(first.__hash).toBe(0);
    console.log(first);

    const second = updateHash(first, ['nested'], 'value');
    expect(second.__hash).not.toBe(0);
    console.log(second);
  });

  const state = {
    testing: {
      blah: 1232,
      blah2: 1244,
      something: {
        deeper: 'hello world',
        value: 'string',
        value2: 'string',
        value3: 'string',
        value4: 'string',
        value5: 'string',
        value6: 'string',
        value7: 'string',
        value8: 'string',
      },
    },
    testing2: {
      blah: 1232,
      blah2: 1244,
      something: {
        deeper: 'hello world',
        value: 'string',
        value2: 'string',
        value3: 'string',
        value4: 'string',
        value5: 'string',
        value6: 'string',
        value7: 'string',
        value8: 'string',
      },
    },
    testing3: {
      blah: 1232,
      blah2: 1244,
      something: {
        deeper: 'hello world',
        value: 'string',
        value2: 'string',
        value3: 'string',
        value4: 'string',
        value5: 'string',
        value6: 'string',
        value7: 'string',
        value8: 'string',
      },
    },
    testing4: {
      blah: 1232,
      blah2: 1244,
      something: {
        deeper: 'hello world',
        value: 'string',
        value2: 'string',
        value3: 'string',
        value4: 'string',
        value5: 'string',
        value6: 'string',
        value7: 'string',
        value8: 'string',
      },
    },
    testing5: {
      blah: 1232,
      blah2: 1244,
      something: {
        deeper: 'hello world',
        value: 'string',
        value2: 'string',
        value3: 'string',
        value4: 'string',
        value5: 'string',
        value6: 'string',
        value7: 'string',
        value8: 'string',
      },
    },
    value: 'string',
    value2: 'string',
    value3: 'string',
    value4: 'string',
    value5: 'string',
    value6: 'string',
    value7: 'string',
    value8: 'string',
  };

  const tree = createHash(state);

  const before = tree.__hash;
  updateHash(tree, ['testing', 'something'], {deeper: 'TESTING'});
  const after = tree.__hash;
  expect(after).not.toBe(before);

  // Hashing should be reasonably performant
  updateHash(tree, ['testing', 'something'], state.testing.something);
  const third = tree.__hash;
  expect(third).toBe(before);

  let start = performance.now();
  for (let i = 0; i < 100; i++) {
    createHash(state);
  }
  let end = performance.now();
  console.log(`Took ${end - start} milliseconds`);

  // Updating the hash should also be reasonably performant.
  start = performance.now();
  for (let i = 0; i < 100; i++) {
    updateHash(tree, ['testing', 'something'], {deeper: 'TESTING'});
    updateHash(tree, ['testing', 'something'], {deeper: 'hello world'});
  }
  end = performance.now();
  console.log(`Took ${end - start} milliseconds`);
});
