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

  // The order of phs is important, and must be preserved.
  // We can't tell what kind of ph it is until the promise is completed.
  // Unless we can annotate a promise

  const generate = async () => {
    let result = '';
    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
      result += tsa[i];
      result += placeholderValues[i];
    }
    // add the last literal
    result += tsa[tsa.length - 1];
    return result; // Todo: Remove any, use correct return type.
  };

  return {
    generate,
    exports,
  } as any;
};
