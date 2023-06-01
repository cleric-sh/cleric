import {MissingSourceError} from '../../../src/configuration/errors/MissingSourceError';
import {Sources} from '../../../src/configuration/populate';
import {readValueFromSources} from '../../../src/configuration/populate/readValueFromSources';

describe('readValueFromSources', () => {
  it('throws Error when property requires source but one is not provided', () => {
    const sources: Sources = [['ProcessEnv', undefined]];
    try {
      readValueFromSources(sources, {}, {ProcessEnv: []}, ['foo']);
    } catch (e) {
      expect(e).toBeInstanceOf(MissingSourceError);
      expect(e.message).toMatchSnapshot();
    }
  });
});
