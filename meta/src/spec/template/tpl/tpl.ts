import {isTemplateStringsArray} from '../../../generators/isTemplateStringsArray';
import {Placeholder} from '../Placeholder';
import {CreatedKeyedTemplate, createKeyedTemplate} from './createKeyedTemplate';
import {
  CreateUnkeyedTemplate,
  createUnkeyedTemplate,
} from './createUnkeyedTemplate';

export type Tpl = CreateUnkeyedTemplate & CreatedKeyedTemplate;

export const tpl: Tpl = (
  keyOrTemplate: TemplateStringsArray | string,
  ...placeholders: Placeholder[]
) => {
  if (isTemplateStringsArray(keyOrTemplate)) {
    return createUnkeyedTemplate(keyOrTemplate, ...placeholders) as any; //todo: fix this hack.
  }

  if (typeof keyOrTemplate === 'string') {
    return createKeyedTemplate(keyOrTemplate);
  }
  throw 'First parameter must always either be a string or TemplateStringsArray';
};
