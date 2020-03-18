/* eslint-disable @typescript-eslint/no-use-before-define */
import * as t from 'io-ts';
import { BehaviorSubject } from 'rxjs';
import { createSlice } from './createSlice';
import { listen } from '@cleric/common';

describe('createSlice', () => {
  it('should create a Slice with Default configuration', async () => {
    const one = t.type({ one: t.string });
    const two = t.type({ two: t.number });
    const union = t.union([one, two]);
    const partial = t.partial({ maybe: t.string });

    const schema = t.intersection([
      t.type({
        foo: t.string,
        bar: t.number,
        obj: t.type({
          val: t.string,
        }),
        union,
      }),
      partial,
    ]);

    const initial: t.TypeOf<typeof schema> = {
      bar: 1,
      foo: 'myString',
      obj: {
        val: 'valString',
      },
      union: {
        one: '123',
      },
    };

    const src = new BehaviorSubject(initial);

    const node = createSlice(schema, src);

    const _node = listen(node.$);

    src.complete();

    expect(await _node).toEqual([initial]);

    // node.$.subscribe(p => console.log(p));
    // node.obj.$.subscribe(p => console.log(p));
    // node.bar.$.subscribe(p => console.log(p));
    // node.union.$is(two).$.subscribe(p => console.log(p));
    // node.union.$is(one).one.$.subscribe(p => console.log(p));
  });
});
