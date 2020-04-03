import {from, isObservable} from 'rxjs';

describe('isObservable', () => {
  it('returns false for arrays', () => {
    expect(isObservable([1, 2, 3])).toBe(false);
  });
  it('returns true for Observable', () => {
    expect(isObservable(from([1, 2, 3]))).toBe(true);
  });
});
