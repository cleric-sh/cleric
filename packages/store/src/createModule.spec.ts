import { createModule } from './createModule';
import { scan, startWith, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

type State = {
  isLayoutExpanded: boolean;
  isSidebarExpanded: boolean;
  test: {
    someProp: string;
    someNum: number;
  };
};

type Sources = {
  toggleExpand: {};
  isMouseOver: boolean;
};

describe('createModule', () => {
  it('does stuff', () => {
    const Module1 = createModule<State, Sources>((state, { isMouseOver, toggleExpand }) => ({
      isLayoutExpanded: toggleExpand.pipe(
        scan(last => !last, false),
        startWith(false),
      ),
      isSidebarExpanded: combineLatest(state.isLayoutExpanded.$, isMouseOver).pipe(
        map(([isExpanded, isMouseOver]) => isExpanded || isMouseOver),
      ),
      test: {
        someNum: toggleExpand.pipe(scan(last => last + 1, 0)),
        someProp: ['Totally'],
      },
    }));

    const Module2 = createModule<State, Sources>((_, { isMouseOver, toggleExpand }) =>
      combineLatest(toggleExpand.pipe(scan(last => !last, false)), isMouseOver).pipe(
        map(([isLayoutExpanded, isMouseOver]) => ({
          isLayoutExpanded,
          isSidebarExpanded: isLayoutExpanded || isMouseOver,
        })),
      ),
    );
  });
});
