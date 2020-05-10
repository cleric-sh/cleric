import {createRefs} from './createRefs';
import {Spec} from './spec/Spec';
import {_SpecExports} from './spec/SpecExports';

type CreateSpec = <TSpec extends Spec>(
  spec: TSpec
) => [TSpec, _SpecExports<TSpec>];
export const createSpec: CreateSpec = spec => {
  return [spec, createRefs() as any];
};
