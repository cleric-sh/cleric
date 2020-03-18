/* eslint-disable sonarjs/no-duplicate-string */
import { marbles } from 'rxjs-marbles';
import { map, reduce, elementAt, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Subject, BehaviorSubject, from, of } from 'rxjs';
import { createStore } from './createStore';
import { createModule } from './_createModule';
import { Store, Source } from './store';
import { listen } from '@cleric/common';

interface SecondValState {
  nestedVal: number;
  secondNestedValue: number;
  deeper: {
    nested: {
      property: string;
    };
  };
}

interface BlahState {
  firstVal: string;
  secondVal: SecondValState;
  arr: string[];
}

const INITIAL_STATE: BlahState = {
  firstVal: 'blah',
  secondVal: {
    nestedVal: 22,
    secondNestedValue: 10,
    deeper: {
      nested: {
        property: 'foo',
      },
    },
  },
  arr: ['testing'],
};

describe('StoreNode', () => {
  let store: Store<BlahState>;

  beforeEach(() => {
    store = createStore(INITIAL_STATE);
  });

  afterEach(() => {
    store.$dispose();
  });

  // it('should accept $static data in initial state', async () => {
  //   const THIS_INITIAL_STATE = {
  //     foo: '',
  //   };

  //   const thisStore = createStore(THIS_INITIAL_STATE);
  //   const values = listen(thisStore.$);

  //   thisStore.$dispose();

  //   console.log(thisStore.foo);

  //   const createProxy = () =>
  //     new Proxy(
  //       {},
  //       {
  //         get: (target, key, receiver) => {
  //           if (!Reflect.has(target, key) && typeof key !== 'symbol') {
  //             console.log(key);
  //             //   console.log(key);
  //             //   const proxy = createProxy();
  //             //   Reflect.set(target, key, proxy, receiver);
  //           }

  //           return Reflect.get(target, key, receiver);
  //         },
  //       },
  //     );

  //   const proxy = createProxy();
  //   expect(proxy).toBe(1);

  //   const subj = new BehaviorSubject(1);
  //   expect(from(subj)).toBe(2);
  //   // expect(thisStore.foo).toBe(2);

  //   await values;
  // });

  it('should only propogate changes when setting actual different values', async () => {
    const SECOND_STATE: BlahState = {
      firstVal: 'second blah',
      secondVal: {
        nestedVal: 22,
        secondNestedValue: 50,
        deeper: {
          nested: {
            property: 'foo',
          },
        },
      },
      arr: ['second'],
    };

    const _storeValues = listen(store.$);
    const _nestedValValues = listen(store.secondVal.nestedVal.$);

    store.secondVal.deeper.nested.property.$;

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.$set(SECOND_STATE);

    // This call should not emit a new value anywhere.
    store.$set(SECOND_STATE);

    store.$dispose();

    // At the store level, we get new values once, so we should have exactly two values.
    expect(await _storeValues).toMatchObject([INITIAL_STATE, SECOND_STATE]);

    // At the nestedVal level, we don't get any new values, so we should only have the initial value, once.
    expect(await _nestedValValues).toMatchObject([INITIAL_STATE.secondVal.nestedVal]);
  });

  it('should only propogate changes when merging different values', async () => {
    const SECOND_STATE = {
      firstVal: 'second blah',
      secondVal: {
        // Deliberately leave out nestedVal. It should be preserved.
        secondNestedValue: 50,
      },
      arr: ['second'],
    };

    const _storeValues = listen(store.$);
    const _nestedValValues = listen(store.secondVal.nestedVal.$);

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.$merge(SECOND_STATE);

    // This call should not emit a new value anywhere.
    store.$merge(SECOND_STATE);

    store.$dispose();

    expect(await _storeValues).toMatchObject([
      INITIAL_STATE,
      {
        firstVal: 'second blah',
        secondVal: {
          nestedVal: 22,
          secondNestedValue: 50,
        },
        arr: ['second'],
      },
    ]);

    // At the nestedVal level, we don't get any new values, so we should only have the initial value, once.
    expect(await _nestedValValues).toMatchObject([INITIAL_STATE.secondVal.nestedVal]);
  });

  it('should only propogate changes when deleting existing values', async () => {
    const _store = listen(store.$);
    const _nestedVal = listen(store.secondVal.nestedVal.$);
    const _arr = listen(store.arr.$);

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.arr.$delete();

    // This call should not emit a new value anywhere.
    store.arr.$delete();

    // This call should make everything emit undefined.
    store.$delete();

    store.$dispose();

    expect(await _store).toMatchObject([
      INITIAL_STATE,
      {
        firstVal: 'blah',
        secondVal: {
          nestedVal: 22,
          secondNestedValue: 10,
        },
        // arr: ['testing']
      },
      undefined,
    ]);

    // No change to secondVal.nestedVal since we're editing a different branch of the tree.
    expect(await _nestedVal).toMatchObject([22, undefined]);

    // The array should only emit a single undefined value once deleted.
    // When the store is deleted, it hasn't actually changed value, it's still undefined.
    expect(await _arr).toMatchObject([INITIAL_STATE.arr, undefined]);
  });

  it('set on root should preserve orignal values (be immutable)', async () => {
    const initial = {
      myValue: 1,
    };
    const store = createStore(initial);
    const _store = listen(store.$);

    store.$set({
      myValue: 2,
    });

    store.$dispose();

    await _store;

    expect(initial.myValue).toBe(1);
  });

  it('merge on root should preserve original values (be immutable)', async () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    const _store = listen(store.$);

    store.$merge({ myValue: { nested: 2 } });

    store.$dispose();

    await _store;

    expect(initial.myValue.nested).toBe(1);
  });

  it('delete on root should preserve original values (be immutable)', async () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    const _store = listen(store.$);
    store.$delete();

    store.$dispose();

    await _store;

    expect(initial.myValue.nested).toBe(1);
  });

  it('set on nested should preserve original values (be immutable)', async () => {
    const initial = {
      myValue: 1,
    };
    const store = createStore(initial);
    const _store = listen(store.$);

    store.myValue.$set(2);

    store.$dispose();

    await _store;

    expect(initial.myValue).toBe(1);
  });

  it('merge on nested should preserve original values (be immutable)', async () => {
    const initial = {
      myValue: {
        nested: {
          deeperNested: 1,
        },
        second: 4,
      },
    };
    const store = createStore(initial);
    const _store = listen(store.$);

    store.myValue.$merge({ nested: { deeperNested: 2 } });

    store.$dispose();

    await _store;

    expect(initial.myValue.nested.deeperNested).toBe(1);
    expect(initial.myValue.second).toBe(4);
  });

  it('delete on nested should preserve original values (be immutable)', async () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    const _store = listen(store.$);

    store.myValue.nested.$delete();

    store.$dispose();

    await _store;

    expect(initial.myValue.nested).toBe(1);
  });

  it('should propogate changes when setting nested values', async () => {
    const _store = listen(store.$);
    const _firstVal = listen(store.firstVal.$);
    const _nestedVal = listen(store.secondVal.nestedVal.$);

    store.secondVal.nestedVal.$set(42);
    store.secondVal.nestedVal.$set(42);

    store.$dispose();

    expect(await _store).toMatchObject([
      INITIAL_STATE,
      {
        firstVal: 'blah',
        secondVal: {
          nestedVal: 42,
          secondNestedValue: 10,
        },
        arr: ['testing'],
      },
    ]);

    expect(await _firstVal).toMatchObject([INITIAL_STATE.firstVal]);

    expect(await _nestedVal).toMatchObject([INITIAL_STATE.secondVal.nestedVal, 42]);
  });

  it('should allow no initial state', async () => {
    const blankStore = createStore<BlahState>();

    const watchStore = listen(blankStore.$);
    const watchSecondVal = listen(blankStore.secondVal.$);

    blankStore.$dispose();

    const storeValues = await watchStore;
    expect(storeValues.length).toBe(0);

    const secondValValues = await watchSecondVal;
    expect(secondValValues.length).toBe(0);
  });

  it('can attach modules and dispose them', () => {
    type MyExampleState = {
      blah: string;
      someNestedValue: {
        somethingElse: number;
      };
    };

    type MyExampleSources = {
      onOff: Source<boolean>;
      something: { moreCh: Source<string> };
      myExtraSource: Source<number>;
    };

    // type ValueOf<TReducer extends Reducer<unknown>> = TReducer extends Reducer<infer U>
    //   ? U
    //   : never;

    // function reduce<TReducer extends Reducer<unknown>>(
    //   reducerFn: (state: Observable<ValueOf<TReducer>>) => Observable<ValueOf<TReducer>>,
    // ): TReducer {
    //   return null;
    // }

    const MyExampleModule = createModule<MyExampleState, MyExampleSources>('MY_EXAMPLE_MODULE')({
      sinks: () => ({
        didSomething: new Subject<number>(),
      }),
      reducer: ({ myExtraSource }) => ({
        someNestedValue: {
          somethingElse: $ =>
            $.pipe(
              withLatestFrom(myExtraSource),
              map(([_, x]) => _ + x),
            ),
        },
      }),
      effects: ({ didSomething, onOff }, { someNestedValue: { $set: setSnv } }) => {
        return {
          DO_SOMETHING: onOff.pipe(
            tap(isOn => {
              if (isOn) {
                setSnv({ somethingElse: 42 });
                didSomething(42);
              } else {
                setSnv({ somethingElse: 0 });
                didSomething(0);
              }
            }),
          ),
          DO_SOMETHING_ELSE: onOff.pipe(tap(onOrOff => console.log('turned: ' + onOrOff))),
        };
      },
    });

    const store = createStore<{ foo: MyExampleState; bar: MyExampleState }>({
      foo: {
        blah: 'blah',
        someNestedValue: {
          somethingElse: 1,
        },
      },
      bar: {
        blah: 'blah',
        someNestedValue: {
          somethingElse: 2,
        },
      },
    });

    store.foo.$.subscribe(state => {
      console.log(state);
    });

    // If we want a module to be controlled externally, we can use Subjects for this.
    const MyActions = {
      onOff: new BehaviorSubject<boolean>(false),
    };

    const mountedFoo = store.foo.$mount(MyExampleModule, {
      ...MyActions,
      something: {
        moreCh: from(['blah']),
      },
      myExtraSource: [1, 2, 3, 4],
    });

    mountedFoo.didSomething.subscribe(value => {
      console.log(value);
    });

    // These should emit values.
    MyActions.onOff.next(true);
    MyActions.onOff.next(false);
    MyActions.onOff.next(true);
    MyActions.onOff.next(true);
    MyActions.onOff.next(true);
    MyActions.onOff.next(true);

    mountedFoo.dispose();

    // These should not emit values, since we disposed the module.
    MyActions.onOff.next(true);
    MyActions.onOff.next(false);
  });

  it('allows undefined state', () => {
    store.$set(undefined as any);
  });

  /**
   * We want to make sure we can consume a reasonable amount of changes with little to no performance impact.
   * Realistically, no application will ingest 1000 mutation at one time.
   * 1000 ms gives a benchmark for how long it takes to consume a single mutation.
   * 500ms / 1000 gives us a rate of about 0.5 ms to consume a set of 7x mutations.
   */
  it('is reasonably performant', async () => {
    const _store = listen(store.$);
    const before = performance.now();
    const times = 1000;
    for (let i = 0; i < times; i++) {
      // This is a full state set, so an expensive operation. The entire hash tree is regenerated here.
      // In practical applications, we will avoid these operations except for init, or re-setting state.
      store.$set({
        firstVal: 'foo',
        secondVal: {
          nestedVal: 2,
          secondNestedValue: 10,
          deeper: {
            nested: {
              property: 'foo',
            },
          },
        },
        arr: ['testing'],
      });

      // These operations are all incremental, and should trigger minimal changes to the object graph.
      store.secondVal.nestedVal.$set(4);
      store.secondVal.$merge({ nestedVal: 7 });
      store.secondVal.$merge({ secondNestedValue: 1117 });
      store.secondVal.nestedVal.$set(3);
      store.secondVal.$merge({ nestedVal: 2 });
      store.secondVal.$merge({ secondNestedValue: 1116 });
    }
    store.$dispose();
    await _store;
    const after = performance.now();
    console.log(`Took ${after - before} ms`);
    console.log(`Average ${(after - before) / times / 7} ms per mutation`);
  });

  it('batch mutations emit one update only', async () => {
    const _store = listen(store.$);

    store.$batch(m => {
      m.$set({
        firstVal: 'foobar',
        secondVal: {
          nestedVal: 123,
          secondNestedValue: 321,
          deeper: {
            nested: {
              property: 'foo',
            },
          },
        },
        arr: ['derp'],
      });

      m.arr.$delete();
      m.arr.$set(['darp']);
      m.secondVal.$merge({ secondNestedValue: 111 });
    });

    store.$dispose();

    expect(await _store).toMatchObject([
      INITIAL_STATE,
      {
        firstVal: 'foobar',
        secondVal: {
          nestedVal: 123,
          secondNestedValue: 111,
        },
        arr: ['darp'],
      },
    ]);
  });

  /**
   * This test ensures that dependent subscriptions are closed and completed correctly when the store is disposed.
   */
  it('completes subscriptions after disposing', () => {
    const store = createStore(INITIAL_STATE);
    let completed = false;
    let completed2 = false;
    const subscription = store.$.subscribe(
      () => {},
      () => {},
      () => (completed = true),
    );
    const subscription2 = store.secondVal.$.subscribe(
      () => {},
      () => {},
      () => (completed2 = true),
    );
    expect(subscription.closed).toBe(false);
    expect(subscription2.closed).toBe(false);
    store.$dispose();
    expect(completed).toBe(true);
    expect(completed2).toBe(true);
    expect(subscription.closed).toBe(true);
    expect(subscription2.closed).toBe(true);
  });
});

/**
 * This test is just making sure that marbles tests work okay.
 */
test(
  'it should support marble tests',
  marbles(m => {
    const values = { a: 1, b: 2, c: 3, d: 4 };

    const source = m.hot('--^-a-b-c-|', values);
    const subs = '^-------!';
    const expected = m.cold('--b-c-d-|', values);

    const destination = source.pipe(map(value => value + 1));
    m.expect(destination).toBeObservable(expected);
    m.expect(source).toHaveSubscriptions(subs);
  }),
);

/**
 * This test is a proof of concept on how to set up rxjs to support something like redux devtools.
 */
test(
  'it should be able to replay a selected sequence of mutations',
  marbles(m => {
    const payloads = { a: 10, b: 20, c: 30, d: 40, e: 50 };
    const actions = m.cold('---a-b-c-d-e---|', payloads);
    const actionsToReplay = { a: [0, 1, 2, 3, 4], b: [0, 1, 2] };
    const initialState = 0;
    const reducer = (acc: any, val: any) => acc + val;

    const currentActionsToReplay = m.cold('ab|', actionsToReplay);

    const currentState$ = currentActionsToReplay.pipe(
      switchMap(arr =>
        of(...arr).pipe(
          mergeMap(index => actions.pipe(elementAt(index))),
          reduce(reducer, initialState),
        ),
      ),
    );

    currentState$.subscribe(v => {
      console.log(v);
    });
  }),
);
