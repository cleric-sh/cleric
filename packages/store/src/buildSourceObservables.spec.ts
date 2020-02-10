import { from } from 'rxjs';
import { createStore } from './createStore';
import { convertSourcesToObservables } from './buildSourceObservables';
import { isSubscribable } from './guards';
import { Source, Sources } from './store';

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
    const sourceObservables = convertSourcesToObservables(props);
    expect(isSubscribable(sourceObservables.one)).toBe(true);
    expect(isSubscribable(sourceObservables.two)).toBe(true);
    expect(isSubscribable(sourceObservables.three)).toBe(true);
    expect(isSubscribable(sourceObservables.four.blah)).toBe(true);
  });
});
