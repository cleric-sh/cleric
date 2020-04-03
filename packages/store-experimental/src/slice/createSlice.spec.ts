/* eslint-disable @typescript-eslint/no-use-before-define */
import {listen} from '@cleric/common';
import * as t from 'io-ts';
import {BehaviorSubject} from 'rxjs';
import '../configs/test';
import {FooBar} from '../configs/test/types/FooBar';
import {Root} from '../configs/test/types/Root';
import {StoreNode} from '../store/StoreNode';
import {Slice} from './Slice';
import {createSlice} from './createSlice';
import {pluck} from 'rxjs/operators';

describe('createSlice', () => {
  const initial: t.TypeOf<typeof Root> = {
    fooBar: {
      bar: 1,
      foo: 'myString',
    },
    fooBar2: {
      bar: 1,
      foo: 'myString',
    },
  };

  let src: BehaviorSubject<t.TypeOf<typeof Root>>;
  let store: StoreNode<'Test', typeof Root>;
  let slice: Slice<'Test', typeof Root, typeof FooBar>;

  beforeEach(() => {
    src = new BehaviorSubject(initial);
    store = new StoreNode('Test', Root, src);
    slice = createSlice(store, FooBar, s => s.pipe(pluck('fooBar')));
  });

  it('should observe source values through $', async () => {
    const _values = listen(slice.$);
    src.complete();
    expect(await _values).toEqual([initial.fooBar]);
  });

  it('should load all configured APIs matching node type', () => {
    expect(slice.doFoo()).toBe('Foo');
    expect(slice.doBar()).toBe('Bar');
  });

  it('should have used configured slice node constructor', () => {
    expect(slice.doTest()).toBe('Test');
  });

  it('should return specified configuration key', () => {
    expect(slice.$configKey).toBe('Test');
  });

  it('should return specified node io-ts type', () => {
    expect(slice.$type).toBe(FooBar);
  });
});
