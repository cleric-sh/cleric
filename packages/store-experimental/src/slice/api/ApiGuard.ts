import * as t from 'io-ts';

export type ApiGuard<T extends t.Any> = (type: t.Any) => type is T;
