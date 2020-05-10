import {isTemplateStringsArray} from '../../../generators/isTemplateStringsArray';
import {Placeholder} from '../Placeholder';
import {CreateKeyedTemplate, createKeyedTemplate} from './createKeyedTemplate';
import {
  CreateUnkeyedTemplate,
  createUnkeyedTemplate,
} from './createUnkeyedTemplate';

export type Tpl = CreateKeyedTemplate & CreateUnkeyedTemplate;

export const tpl: Tpl = (
  keyOrTemplate: TemplateStringsArray | string,
  ...placeholders: Placeholder[]
) => {
  if (isTemplateStringsArray(keyOrTemplate)) {
    return createUnkeyedTemplate(keyOrTemplate, ...placeholders) as any; //todo: fix this hack.
  }

  if (typeof keyOrTemplate === 'string') {
    return createKeyedTemplate(keyOrTemplate) as any;
  }
  throw 'First parameter must always either be a string or TemplateStringsArray';
};
