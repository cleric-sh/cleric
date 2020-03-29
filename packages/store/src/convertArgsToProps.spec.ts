import {from, Observable} from 'rxjs';
import {createStore} from './createStore';
import {convertArgsToProps} from './convertArgsToProps';
import {isSubscribable} from './guards';
import {checks, check, Pass} from '@cleric/common';
import {Extends} from 'Any/_api';
import {SourceProps} from '.';
import {Source, SourceArgs, Store, SliceApiI} from './store';

describe('buildSourceObservables', () => {
  it('converts all props into observables', () => {
    const store = createStore({});
    const props = {
      one: [1, 2, 3],
      two: from([4, 5, 6]),
      three: store,
      four: {
        blah: [1],
      },
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
