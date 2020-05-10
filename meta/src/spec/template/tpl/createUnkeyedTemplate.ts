import {Placeholder} from '../Placeholder';
import {UnkeyedTemplate} from '../UnkeyedTemplate';

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
  const placeholderValues = await Promise.all(placeholders);
  let result = '';
  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += tsa[i];
    result += placeholderValues[i];
  }
  // add the last literal
  result += tsa[tsa.length - 1];
  return result as any; // Todo: Remove any, use correct return type.
};
