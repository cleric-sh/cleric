/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { createSlice } from './createSlice';
import { listen } from '@cleric/common';
import { FooBar } from '../configs/test/types/FooBar';
import { Slice } from './Slice';
import '../configs/test';

describe('createSlice', () => {

  const initial: t.TypeOf<typeof FooBar> = {
    bar: 1,
    foo: 'myString',
  };

  let node: Slice<'Test', typeof FooBar>;
  let src: BehaviorSubject<t.TypeOf<typeof FooBar>>;

  beforeEach(() => {

    src = new BehaviorSubject(initial);
    node = createSlice(FooBar, src, 'Test');
  })

  it('should observe source values through $', async () => {
    const _values = listen(node.$);
    src.complete();
    expect(await _values).toEqual([initial]);
  });

  it('should load all configured APIs matching node type', () => {
    expect(node.doFoo()).toBe('Foo');
    expect(node.doBar()).toBe('Bar');
  })

  it('should have used configured slice node constructor', () => {
    expect(node.doTest()).toBe('Test');
  })

  it('should return specified configuration key', () => {
    expect(node.$configKey).toBe('Test');
  })

  it('should return specified node io-ts type', () => {
    expect(node.$type).toBe(FooBar);
  })

});
