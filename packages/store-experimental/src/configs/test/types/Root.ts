import * as t from 'io-ts';

import {FooBar} from './FooBar';

export const Root = t.type({fooBar: FooBar, fooBar2: FooBar});
