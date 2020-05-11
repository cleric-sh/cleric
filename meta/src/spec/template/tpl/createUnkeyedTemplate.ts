import {Context} from '../Context';
import {Placeholder} from '../Placeholder';
import {UnkeyedTemplate} from '../UnkeyedTemplate';
import {isTemplate} from '../isTemplate';
import {handleLazyPlaceholder} from './handleLazyPlaceholder';

export interface CreateUnkeyedTemplate {
  <TPlaceholders extends Placeholder[]>(
    value: TemplateStringsArray,
    ...placeholders: TPlaceholders
  ): Promise<UnkeyedTemplate<TPlaceholders>>;
}

export const createUnkeyedTemplate: CreateUnkeyedTemplate = async (
  tsa,
  ...placeholders
) => {
  const generate = async (ctx: Context) => {
    const placeholderValues = await Promise.all(placeholders);

    let result = '';
    // interleave the literals with the placeholders
    for (let i = 0; i < placeholderValues.length; i++) {
      result += tsa[i];

      const value = placeholderValues[i];

      if (isTemplate(value)) {
        result += await value.generate(ctx);
      } else if (typeof value === 'function') {
        result += await handleLazyPlaceholder(value);
      } else if (typeof value === 'string') {
        result += value;
      } else throw 'Unrecognized placeholder value: ' + value;
    }
    // add the last literal
    result += tsa[tsa.length - 1];
    return result;
  };

  return {
    __type: 'Template',
    generate,
  };
};
