import {PromiseOf} from 'Class/_api';
import {Refs} from './Refs';
import {Spec} from './Spec';
import {ExportsOf} from './directory/NodesExports';

export type SpecRefs<TSpec extends Spec> = Refs<
  ExportsOf<PromiseOf<ReturnType<TSpec>>>
>;
