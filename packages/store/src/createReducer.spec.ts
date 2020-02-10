import { createReducer } from './createReducer';
import { scan, map, withLatestFrom } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { Source } from './store';
import { createStore } from './createStore';

type State = {
  isLayoutExpanded: boolean;
  isSidebarExpanded: boolean;
  test: {
    someProp: string;
    someNum: number;
  };
};

type Sources = {
  toggleExpand: Source<{}>;
  isMouseOver: Source<boolean>;
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
    const Reducer = createReducer<State, Sources>((state, { isMouseOver, toggleExpand }) => ({
      isLayoutExpanded: toggleExpand.pipe(scan(last => !last, false)),
      isSidebarExpanded: state.isLayoutExpanded.$.pipe(
        withLatestFrom(isMouseOver),
        map(([isExpanded, isMouseOver]) => isExpanded || isMouseOver),
      ),
      // test: {
      //   someNum: toggleExpand.pipe(scan(last => last + 1, 0)),
      //   someProp: ['Foo'],
      // },
    }));

    store.$.subscribe(m => console.log(m));

    const MyActions = {
      isMouseOver: new BehaviorSubject(false),
      toggleExpand: new Subject(),
      someSource: {
        trigger: [],
      },
    };

    const subscriptions = Reducer(store, MyActions);

    MyActions.toggleExpand.next();
    // MyActions.toggleExpand.next({});

    subscriptions.map(sub => sub.unsubscribe());
  });
});