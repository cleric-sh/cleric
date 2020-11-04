import * as t from 'io-ts';

import {fooBar} from './FooBar';

export const root = t.type({fooBar: fooBar, fooBar2: fooBar});

export type Root = typeof root;
