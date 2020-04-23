/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import '../configs/test';

import {listen} from '@cleric/common';
import {BehaviorSubject} from 'rxjs';
import {pluck} from 'rxjs/operators';
import {fooBar} from '../configs/test/types/FooBar';
import {root} from '../configs/test/types/Root';
import {StoreNode} from '../store/StoreNode';
import {_Slice} from './Slice';
import {createSlice} from './createSlice';
import {Slice$Selector} from './node/Slice$Selector';

describe('createSlice', () => {
  const initial: t.TypeOf<typeof root> = {
    fooBar: {
      bar: 1,
      foo: 'myString',
    },
    fooBar2: {
      bar: 1,
      foo: 'myString',
    },
  };

  let src: BehaviorSubject<t.TypeOf<typeof root>>;
  let store: StoreNode<'Test', typeof root>;
  let selector: Slice$Selector<typeof root, typeof fooBar>;
  let slice: _Slice<'Test', typeof root, typeof fooBar>;

  beforeEach(() => {
    src = new BehaviorSubject(initial);
    store = new StoreNode('Test', root, src);
    selector = s => s.pipe(pluck('fooBar'));
    slice = createSlice(store, fooBar, selector);
  });

  it('should observe selected values through $', async () => {
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
    expect(slice.$type).toBe(fooBar);
  });
});
