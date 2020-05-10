import {Placeholder} from '../Placeholder';
import {KeyedTemplate} from '../Template';
import {createUnkeyedTemplate} from './createUnkeyedTemplate';

export interface CreatedKeyedTemplate {
  <TKey extends string>(key: TKey): {
    <TPlaceholders extends Placeholder[]>(
      value: TemplateStringsArray,
      ...placeholders: TPlaceholders
    ): Promise<KeyedTemplate<TKey, TPlaceholders>>;
  };
}

export const createKeyedTemplate: CreatedKeyedTemplate = key => async (
  template,
  ...placeholders
) => {
  const unkeyed = await createUnkeyedTemplate(template, ...placeholders);
  return {
    ...unkeyed,
    key,
  };
};
