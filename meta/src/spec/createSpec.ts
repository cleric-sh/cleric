import {Spec} from './Spec';
import {SpecRefs} from './SpecRefs';
import {createRefs} from './createRefs';

type CreateSpec = <TSpec extends Spec>(spec: TSpec) => [TSpec, SpecRefs<TSpec>];

export const createSpec: CreateSpec = spec => {
  return [spec, createRefs() as any];
};
