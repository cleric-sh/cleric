import { isString, isArray, isObject } from "util";

import { validate } from "jsonschema";

export const json = (schema: object, value: string | object | TemplateStringsArray, ...placeholders: string[]) => {

    let input: object = undefined;

    if (isString(value)) {
        input = JSON.parse(value);
    }
    else if (isArray(value)) {
        let result = "";

        // interleave the literals with the placeholders
        for (let i = 0; i < placeholders.length; i++) {
            result += value[i];
            result += placeholders[i];
        }

        // add the last literal
        result += value[value.length - 1];
        input = JSON.parse(result);
    }
    else if (isObject(value)) {
        input = value;
    }

    if (schema) {
        const validationResult = validate(input, schema);
        if (validationResult.errors.length > 0) console.log(validationResult.errors);
    }
    return JSON.stringify(input, null, 2);
}