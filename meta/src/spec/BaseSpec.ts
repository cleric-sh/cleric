import {_ImportsOf} from './ImportsOf';
import {Spec} from './Spec';

export abstract class BaseSpec<TSpec extends Spec<unknown>> {
  refs: _ImportsOf<TSpec> = {} as any;
}
