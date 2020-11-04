import * as t from 'io-ts';

export const unknown = t.type({
  whatIsThis: t.string,
});

export type Unknown = typeof unknown;
