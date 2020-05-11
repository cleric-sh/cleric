import {PromiseOf} from 'Class/_api';
import {WriteContext} from '../../../generate/WriteContext';
import {Placeholder} from '../Placeholder';
import {isTemplate} from '../isTemplate';
import {handleLazyPlaceholder} from './handleLazyPlaceholder';
export const handlePlaceholder = async (
  value: PromiseOf<Placeholder>,
  ctx: WriteContext
) => {
  if (isTemplate(value)) {
    return await value.generate(ctx);
  }
  if (typeof value === 'function') {
    return await handleLazyPlaceholder(value);
  }
  if (typeof value === 'string') {
    return value;
  }
  throw 'Unrecognized placeholder value: ' + value;
};
