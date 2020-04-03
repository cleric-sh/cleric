import * as t from 'io-ts';

import {doSomethingElse} from './createSlice';
import {Root} from '../configs/test/types/Root';
import {BehaviorSubject} from 'rxjs';
import {StoreNode} from '../store/StoreNode';
import {$Selector} from './node/SliceNode';
import {FooBar} from '../configs/test/types/FooBar';
import {Slice} from './Slice';
import {pluck} from 'rxjs/operators';

describe('doSomethingElse', () => {
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
  let selector: $Selector<typeof Root, typeof FooBar>;
  let slice: Slice<'Test', typeof Root, typeof FooBar>;

  beforeEach(() => {
    src = new BehaviorSubject(initial);
    store = new StoreNode('Test', Root, src);
    selector = s => s.pipe(pluck('fooBar'));
  });

  it('should do stuff', () => {
    slice = doSomethingElse(store, FooBar, selector);
  });
});
