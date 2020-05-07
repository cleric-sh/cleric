import {MaybePromise} from '../util/MaybePromise';
import {TupleOf} from '../util/TupleOf';

export type Spec = (...args: never[]) => MaybePromise<TupleOf<unknown>>;
