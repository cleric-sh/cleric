import {KeyedTemplate} from '../KeyedTemplate';
import {Placeholder} from '../Placeholder';
import {createUnkeyedTemplate} from './createUnkeyedTemplate';

export interface CreateKeyedTemplate {
  <TKey extends string>(key: TKey): {
    <TPlaceholders extends Placeholder[]>(
      value: TemplateStringsArray,
      ...placeholders: TPlaceholders
    ): Promise<KeyedTemplate<TKey, TPlaceholders>>;
  };
}

export const createKeyedTemplate: CreateKeyedTemplate = key => async (
  template,
  ...placeholders
) => {
  const unkeyed = await createUnkeyedTemplate(template, ...placeholders);
  return {
    generate: unkeyed.generate,
    exports: {
      [key]: unkeyed.exports,
    },
    key,
  } as any;
};
