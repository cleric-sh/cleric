import {WriteContext} from '../../generate/WriteContext';
import {Placeholder} from './Placeholder';
import {UnkeyedTemplate} from './UnkeyedTemplate';
import {handlePlaceholder} from './handlePlaceholder';

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
  const generate = async (ctx: WriteContext) => {
    const placeholderValues = await Promise.all(placeholders);

    let result = '';
    // interleave the literals with the placeholders
    for (let i = 0; i < placeholderValues.length; i++) {
      result += tsa[i];

      const value = placeholderValues[i];

      result += await handlePlaceholder(value, ctx);
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
