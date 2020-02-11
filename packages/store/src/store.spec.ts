/* eslint-disable sonarjs/no-duplicate-string */
import { marbles } from 'rxjs-marbles';
import { map, reduce, elementAt, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { Subject, BehaviorSubject, from, of, Observable } from 'rxjs';
import { createStore } from './createStore';
import { createModule } from './_createModule';
import { Store, Source } from './store';
import { Reducer } from './createReducer';

interface ISecondValState {
  nestedVal: number;
  secondNestedValue: number;
}

interface IBlahState {
  firstVal: string;
  secondVal: ISecondValState;
  arr: string[];
}

const INITIAL_STATE: IBlahState = {
  firstVal: 'blah',
  secondVal: {
    nestedVal: 22,
    secondNestedValue: 10,
  },
  arr: ['testing'],
};

describe('StoreNode', () => {
  let store: Store<IBlahState>;

  beforeEach(() => {
    store = createStore(INITIAL_STATE);
  });

  afterEach(() => {
    store.$dispose();
  });

  it('should only propogate changes when setting actual different values', () => {
    const SECOND_STATE = {
      firstVal: 'second blah',
      secondVal: {
        nestedVal: INITIAL_STATE.secondVal.nestedVal,
        secondNestedValue: 50,
      },
      arr: ['second'],
    };

    store.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(2);
      expect(values[0]).toBe(INITIAL_STATE);
      expect(values[1]).toBe(SECOND_STATE);
    });

    store.secondVal.nestedVal.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(1); // nestedVal doesn't change, so we should only ever have one value for it.
      expect(values[0]).toBe(INITIAL_STATE.secondVal.nestedVal); // The value should be the original value we inputted
    });

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.$set(SECOND_STATE);

    // This call should not emit a new value anywhere.
    store.$set(SECOND_STATE);
  });

  it('should only propogate changes when merging different values', () => {
    const SECOND_STATE = {
      firstVal: 'second blah',
      secondVal: {
        secondNestedValue: 50,
      },
      arr: ['second'],
    };

    store.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(2);
      expect(values[0]).toBe(INITIAL_STATE);
      expect(values[1]).toMatchObject({
        firstVal: 'second blah',
        secondVal: {
          nestedVal: 22,
          secondNestedValue: 50,
        },
        arr: ['second'],
      });
    });

    store.secondVal.nestedVal.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(1); // nestedVal doesn't change, so we should only ever have one value for it.
      expect(values[0]).toBe(INITIAL_STATE.secondVal.nestedVal); // The value should be the original value we inputted
    });

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.$merge(SECOND_STATE);

    // This call should not emit a new value anywhere.
    store.$merge(SECOND_STATE);
  });

  it('should only propogate changes when deleting existing values', () => {
    store.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(3);
      expect(values[0]).toBe(INITIAL_STATE);
      expect(values[1]).toMatchObject({
        firstVal: 'blah',
        secondVal: {
          nestedVal: 22,
          secondNestedValue: 10,
        },
        // arr: ['testing']
      });
      expect(values[2]).toBe(undefined);
    });

    store.secondVal.nestedVal.$.pipe(toArray()).subscribe(values => {
      //No change to secondVal.nestedVal since we're editing a different branch of the tree.
      expect(values.length).toBe(2);
      expect(values[0]).toBe(22);
      expect(values[1]).toBe(undefined);
    });

    store.arr.$.pipe(toArray()).subscribe(values => {
      expect(values.length).toBe(2);
      expect(values[0]).toMatchObject(INITIAL_STATE.arr);
      expect(values[1]).toBe(undefined);
    });

    // This call should emit a new state, however it keeps store.secondVal.nestedVal the same.
    // Store should emit a new state, but nestedVal shouldn't.
    store.arr.$delete();

    // This call should not emit a new value anywhere.
    store.arr.$delete();

    // This call should make everything emit undefined.
    store.$delete();
  });

  it('set on root should preserve orignal values (be immutable)', () => {
    const initial = {
      myValue: 1,
    };
    const store = createStore(initial);
    store.$set({
      myValue: 2,
    });

    expect(initial.myValue).toBe(1);
  });

  it('merge on root should preserve original values (be immutable)', () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    store.$merge({ myValue: { nested: 2 } });

    expect(initial.myValue.nested).toBe(1);
  });

  it('delete on root should preserve original values (be immutable)', () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    store.$delete();

    expect(initial.myValue.nested).toBe(1);
  });

  it('set on nested should preserve original values (be immutable)', () => {
    const initial = {
      myValue: 1,
    };
    const store = createStore(initial);
    store.myValue.$set(2);

    expect(initial.myValue).toBe(1);
  });

  it('merge on nested should preserve original values (be immutable)', () => {
    const initial = {
      myValue: {
        nested: {
          deeperNested: 1,
        },
        second: 4,
      },
    };
    const store = createStore(initial);
    store.myValue.$merge({ nested: { deeperNested: 2 } });

    expect(initial.myValue.nested.deeperNested).toBe(1);
    expect(initial.myValue.second).toBe(4);
  });

  it('delete on nested should preserve original values (be immutable)', () => {
    const initial = {
      myValue: {
        nested: 1,
      },
    };
    const store = createStore(initial);
    store.myValue.nested.$delete();

    expect(initial.myValue.nested).toBe(1);
  });

  it('should propogate changes when setting nested values', () => {
    store.$.pipe(toArray()).subscribe(values => {
      expect(values).toMatchObject([
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
    });

    store.firstVal.$.pipe(toArray()).subscribe(values => {
      expect(values).toMatchObject([INITIAL_STATE.firstVal]);
    });

    store.secondVal.nestedVal.$.pipe(toArray()).subscribe(values => {
      expect(values).toMatchObject([INITIAL_STATE.secondVal.nestedVal, 42]);
    });

    store.secondVal.nestedVal.$set(42);
    store.secondVal.nestedVal.$set(42);
  });

  it('should allow no initial state', () => {
    const blankStore = createStore<IBlahState>();
    blankStore.$.subscribe(value => {
      console.log(value);
    });

    blankStore.secondVal.$.subscribe(value => {
      console.log(value);
    });
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
      reducer: (state, { myExtraSource }) => ({
        someNestedValue: {
          somethingElse: ,
        },
      }),
      effects: (
        { someNestedValue, someNestedValue: { $set: setSnv, $merge: mergeSnv }, blah },
        { didSomething, something: { moreCh }, onOff, myExtraSource },
      ) => {
        // const map: EffectMap = {
        //     blah: onOff.pipe(
        //         tap(value => {

        //         })
        //     )
        // }

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

    const mountedFoo = store.foo.$mount(
      MyExampleModule({
        ...MyActions,
        something: {
          moreCh: from(['blah']),
        },
        myExtraSource: [1, 2, 3, 4],
      }),
    );

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

  /**
   * We want to make sure we can consume a reasonable amount of changes with little to no performance impact.
   * Realistically, no application will ingest 1000 mutation at one time.
   * 1000 ms gives a benchmark for how long it takes to consume a single mutation.
   * 500ms / 1000 gives us a rate of about 0.5 ms to consume a set of 7x mutations.
   */
  it('is reasonably performant', () => {
    const before = performance.now();
    for (let i = 0; i < 1000; i++) {
      // This is a full state set, so an expensive operation. The entire hash tree is regenerated here.
      // In practical applications, we will avoid these operations except for init, or re-setting state.
      store.$set({
        firstVal: 'foo',
        secondVal: {
          nestedVal: 2,
          secondNestedValue: 10,
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
    const after = performance.now();
    console.log(`Took ${after - before} milliseconds`);
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
    const reducer = (acc, val) => acc + val;

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
