import {validate} from 'jsonschema';
import {Placeholder} from '../spec/template/Placeholder';
import {GenerateFn} from '../spec/template/Template';
import {CreateUnkeyedTemplate} from '../spec/template/tpl/createUnkeyedTemplate';
import {tpl} from '../spec/template/tpl/tpl';
import {ObjectWriter} from './ObjectWriter';
import {StringWriter} from './StringWriter';
import {isTemplateStringsArray} from './isTemplateStringsArray';

export type Json = <T extends object>(
  schema?: object
) => CreateUnkeyedTemplate & ObjectWriter<T> & StringWriter;

const post = (value: object, schema?: object) => {
  if (schema) {
    const validation = validate(value, schema);
    if (validation.errors.length > 0) {
      console.log(validation.errors);
    }
  }

  return JSON.stringify(value, null, 2);
};

export const json: Json = schema => async (
  value: TemplateStringsArray | object | string,
  ...placeholders: Placeholder[]
) => {
  if (isTemplateStringsArray(value)) {
    const template = await tpl(value, ...placeholders);

    const generate: GenerateFn = async ctx => {
      const _value = JSON.parse(await template.generate(ctx));
      return post(_value, schema);
    };

    return {
      __type: 'Template',
      generate,
    } as any;
  }

  if (typeof value === 'object' && value !== null) {
    return post(value, schema);
  }

  if (typeof value === 'string') {
    return post(JSON.parse(value), schema);
  }

  throw 'Input value not recognized.';
};
