import {applyDelete} from './applyDelete';
import {createState} from './createState';

describe('applyDelete', () => {
  it('should set root state to undefined', () => {
    const initial = createState({});
    const expected = createState(undefined);
    const after = applyDelete(initial, []);

    expect(after).toMatchObject(expected);
  });

  it('should remove property from parent completely', () => {
    const initial = createState({
      property1: {},
      property2: {},
      property3: {},
    });
    const expected = createState({
      property1: {},
      property3: {},
    });
    const after = applyDelete(initial, ['property2']);
    expect(after).toMatchObject(expected);
  });
});
