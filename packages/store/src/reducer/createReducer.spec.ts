import {BehaviorSubject, Subject} from 'rxjs';
import {combineLatest, map, scan, tap, withLatestFrom} from 'rxjs/operators';
import {createStore} from '../createStore';
import {Source} from '../store';
import {createReducer} from './createReducer';

type State = {
  isLayoutExpanded: boolean;
  isSidebarExpanded: boolean;
  test: {
    someNum: number;
    someProp: string;
  };
};

type Sources = {
  isMouseOver: Source<boolean>;
  toggleExpand: Source<{}>;
  someSource: {
    trigger: Source<number>;
  };
};

describe('createReducer', () => {
  const store = createStore<State>({
    isLayoutExpanded: false,
    isSidebarExpanded: false,
    test: {
      someNum: 0,
      someProp: '',
    },
  });

  it('does stuff', () => {
    const Reducer = createReducer<State, Sources>(
      ({isMouseOver, toggleExpand}) => ({
        // isLayoutExpanded: toggleExpand.pipe(scan(last => !last, false)),
        // isSidebarExpanded: state.isLayoutExpanded.$.pipe(
        //   withLatestFrom(isMouseOver),
        //   map(([isExpanded, isMouseOver]) => isExpanded || isMouseOver),
        // ),
        // test: $ => $,
        test: {
          someNum: $ =>
            $.pipe(
              // tap(v => console.log(v)),
              combineLatest(isMouseOver),
              // tap(v => console.log(v)),
              map(([_, isMouseOver]) => (isMouseOver ? 10 : 0))
              // tap(v => console.log(v)),
            ),
        },
        // test: {
        //   someNum: toggleExpand.pipe(scan(last => last + 1, 0)),
        //   someProp: ['Foo'],
        // },
      })
    );

    store.$.subscribe(m => console.log(m));

    const MyActions = {
      isMouseOver: new BehaviorSubject(false),
      someSource: {
        trigger: [] as any[],
      },
      toggleExpand: new Subject<{}>(),
    };

    const subscriptions = Reducer(store, MyActions);

    // MyActions.toggleExpand.next();
    MyActions.isMouseOver.next(true);
    MyActions.isMouseOver.next(false);
    MyActions.isMouseOver.next(true);
    // MyActions.toggleExpand.next({});

    subscriptions.map(sub => sub.unsubscribe());
  });
});
