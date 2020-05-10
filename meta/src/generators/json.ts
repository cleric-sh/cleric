import {validate} from 'jsonschema';
import {CreateUnkeyedTemplate} from '../spec/template/tpl/createUnkeyedTemplate';
import {tpl} from '../spec/template/tpl/tpl';
import {ObjectWriter} from './ObjectWriter';
import {StringWriter} from './StringWriter';
import {file} from './file';
import {isTemplateStringsArray} from './isTemplateStringsArray';

export type Json = <T extends object>(
  schema: undefined | object
) => CreateUnkeyedTemplate | ObjectWriter<T> | StringWriter;

export const json: Json = schema => async (
  value: unknown,
  ...placeholders: string[]
) => {
  let input: undefined | object = undefined;

  if (typeof value === 'string') {
    input = JSON.parse(value);
  } else if (isTemplateStringsArray(value)) {
    const result = await tpl(value, ...placeholders);

    input = JSON.parse(result);
  } else if (value !== null && typeof value === 'object') {
    input = value as object;
  }

  if (schema) {
    const validationResult = validate(input, schema);
    if (validationResult.errors.length > 0) {
      console.log(validationResult.errors);
    }
  }

  return JSON.stringify(input, null, 2);
};
