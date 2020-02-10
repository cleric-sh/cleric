import { buildSourceInput } from './buildSourceInput';
import { isObservable, from } from 'rxjs';
import { createStore } from './createStore';

describe('buildSourceInput', () => {
  it('returns observable from array', () => {
    const input = buildSourceInput([1, 2, 3]);
    expect(isObservable(input)).toBe(true);
  });

  it('returns observable from observable', () => {
    const input = buildSourceInput(from([1, 2, 3]));
    expect(isObservable(input)).toBe(true);
  });

  it('returns slice from slice', () => {
    const store = createStore({
      test: true,
    });
    const input = buildSourceInput(store);
    expect(isObservable(input)).toBe(true);
  });

  it('throws when not observableinput', () => {
    expect(() => buildSourceInput({} as any)).toThrow();
  });
});
