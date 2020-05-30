import {MaybePromise} from '../util/MaybePromise';
import {Nodes} from './Nodes';

export type Spec = (...args: never[]) => MaybePromise<Nodes>;
