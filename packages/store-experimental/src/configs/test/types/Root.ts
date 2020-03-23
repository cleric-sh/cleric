import { FooBar } from './FooBar';
import * as t from 'io-ts';

export const Root = t.type({
    fooBar: FooBar,
    fooBar2: FooBar
});
