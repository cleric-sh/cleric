import {PromiseOf} from 'Class/_api';
import {ExportsOf} from './ExportsOf';
import {Refs} from './Refs';
import {Spec} from './Spec';

export type RefsOf<TSpec extends Spec> = Refs<
  ExportsOf<PromiseOf<ReturnType<TSpec>>>
>;
