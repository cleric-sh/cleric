import {splitCamelCase} from '../../../src/configuration/utils/splitCamelCase';

describe('splitCamelCase', () => {
  it('splits upper camel case', () => {
    const out = splitCamelCase('UpperCamelCase');
    expect(out).toStrictEqual(['Upper', 'Camel', 'Case']);
  });
  it('splits lower camel case', () => {
    const out = splitCamelCase('lowerCamelCase');
    expect(out).toStrictEqual(['lower', 'Camel', 'Case']);
  });
  it('splits on numbers', () => {
    const out = splitCamelCase('lower1CamelCase');
    expect(out).toStrictEqual(['lower', '1', 'Camel', 'Case']);
  });
  it('preserves consecutive capitals', () => {
    const out = splitCamelCase('PREFIXEDlower1CamelCase');
    expect(out).toStrictEqual(['PREFIXED', 'lower', '1', 'Camel', 'Case']);
  });
});
