import {validate} from 'jsonschema';
import {Placeholder} from '../spec/template/Placeholder';
import {GenerateFn} from '../spec/template/Template';
import {CreateUnkeyedTemplate} from '../spec/template/createUnkeyedTemplate';
import {t} from '../spec/template/t';
import {ObjectWriter} from './ObjectWriter';
import {StringWriter} from './StringWriter';
import {isTemplateStringsArray} from './isTemplateStringsArray';

export type Json = <T extends object>(
  schema?: object
) => CreateUnkeyedTemplate & ObjectWriter<T> & StringWriter;

const validateAndStringify = (jsonObject: object, schema?: object) => {
  if (schema) {
    const validation = validate(jsonObject, schema);
    if (validation.errors.length > 0) {
      console.log(validation.errors);
    }
  }

  return JSON.stringify(jsonObject, null, 2);
};

export const json: Json = schema => async (
  value: TemplateStringsArray | object | string,
  ...placeholders: Placeholder[]
) => {
  if (isTemplateStringsArray(value)) {
    const template = await t(value, ...placeholders);

    const generate: GenerateFn = async ctx => {
      const jsonObject = JSON.parse(await template.generate(ctx));
      return validateAndStringify(jsonObject, schema);
    };

    return {
      __type: 'Template',
      generate,
    } as any;
  }

  if (typeof value === 'object' && value !== null) {
    return validateAndStringify(value, schema);
  }

  if (typeof value === 'string') {
    return validateAndStringify(JSON.parse(value), schema);
  }

  throw 'Input value not recognized.';
};
