import { from, isObservable } from 'rxjs';
import { createStore } from './createStore';
import { buildSourceObservables } from './buildSourceObservables';

describe('buildSourceObservables', () => {
  it('converts all props into observables', () => {
    const store = createStore({});
    const props = {
      one: [1, 2, 3],
      two: from([4, 5, 6]),
      three: store,
    };
    const sourceObservables = buildSourceObservables(props);
    expect(isObservable(sourceObservables.one)).toBe(true);
    expect(isObservable(sourceObservables.two)).toBe(true);
    expect(isObservable(sourceObservables.three)).toBe(true);
  });
});
