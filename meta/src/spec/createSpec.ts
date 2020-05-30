import {RefsOf} from './RefsOf';
import {Spec} from './Spec';
import {createRefs} from './createRefs';

export type CreateSpec = <TSpec extends Spec>(
  spec: TSpec
) => [TSpec, RefsOf<TSpec>];

export const createSpec: CreateSpec = spec => {
  return [spec, createRefs(spec) as any];
};
