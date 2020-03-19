/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { createSlice } from './createSlice';
import { listen } from '@cleric/common';
import { FooBar } from '../test/types/FooBar';
import '../test';

describe('createSlice', () => {
  it('should create a Slice decorated with matching APIs', async () => {

    const initial: t.TypeOf<typeof FooBar> = {
      bar: 1,
      foo: 'myString',
    };

    const src = new BehaviorSubject(initial);

    const node = createSlice(FooBar, src, 'Test');

    const _values = listen(node.$);

    src.complete();

    expect(await _values).toEqual([initial]);
    expect(node.doFoo()).toBe('Foo');
    expect(node.doBar()).toBe('Bar');
    expect(node.$configKey).toBe('Test');
    expect(node.$type).toBe(FooBar);
  });
});
