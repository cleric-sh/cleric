import {Pass, check, checks} from '@cleric/common';
import {Extends} from 'Any/_api';
import {Observable, from} from 'rxjs';
import {SourceProps} from '.';
import {convertArgsToProps} from './convertArgsToProps';
import {createStore} from './createStore';
import {isSubscribable} from './guards';
import {SliceApiI, Source, SourceArgs, Store} from './store';

describe('buildSourceObservables', () => {
  it('converts all props into observables', () => {
    const store = createStore({});
    const props = {
      four: {
        blah: [1],
      },
      one: [1, 2, 3],
      three: store,
      two: from([4, 5, 6]),
    };

    checks([
      check<
        Extends<
          typeof props,
          {
            one: Source<number>;
            two: Source<number>;
            three: Source<{}>;
            four: {blah: Source<number>};
          }
        >,
        1,
        Pass
      >(),
    ]);
    checks([check<Extends<Store<{}>, SliceApiI<{}>>, 1, Pass>()]);
    checks([check<Extends<typeof props, SourceArgs>, 1, Pass>()]);

    const sourceObservables = convertArgsToProps(props);

    expect(isSubscribable(sourceObservables.one)).toBe(true);
    expect(isSubscribable(sourceObservables.two)).toBe(true);
    expect(isSubscribable(sourceObservables.three)).toBe(true);
    expect(isSubscribable(sourceObservables.four.blah)).toBe(true);
  });
});
