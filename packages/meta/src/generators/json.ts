import { isString, isArray, isObject } from 'util';

import { validate } from 'jsonschema';

export type Json<T extends object> = {
  (value: string): string;
  (value: T): string;
  (value: TemplateStringsArray, ...placeholders: string[]): string;
};

export const json = <T extends object>(schema: object | undefined): Json<T> => (
  value: unknown,
  ...placeholders: string[]
) => {
  let input: object | undefined = undefined;

  if (isString(value)) {
    input = JSON.parse(value);
  } else if (isArray(value)) {
    let result = '';

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; i++) {
      result += value[i];
      result += placeholders[i];
    }

    // add the last literal
    result += value[value.length - 1];
    input = JSON.parse(result);
  } else if (isObject(value)) {
    input = value as object;
  }

  if (schema) {
    const validationResult = validate(input, schema);
    if (validationResult.errors.length > 0) console.log(validationResult.errors);
  }
  return JSON.stringify(input, null, 2);
};
