import {TupleOf} from '../util/TupleOf';

export type Spec = (...args: never[]) => TupleOf<unknown>;
