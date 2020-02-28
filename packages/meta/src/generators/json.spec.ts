import { json } from "./json"
import { curry } from "ramda"

describe('jsonFile', () => {

    const jsonStr = '{ "test": "value" }';
    const jsonObj = { test: "value" };
    const formatted = `{
  "test": "value"
}`;

    it('accepts plain string, without schema', () => {
        const actual = json(undefined)(jsonStr);
        expect(actual).toBe(formatted);
    })

    it('fails on invalid json string, without schema', () => {
        expect(() => json(undefined)('rubbish')).toThrow();
    })

    it('accepts plain object, without schema', () => {
        const actual = json(undefined)(jsonObj);
        expect(actual).toBe(formatted);
    })

    it('accepts tagged template literals, without schema', () => {
        const actual = json(undefined)`{ "test": "value" }`
        expect(actual).toBe(formatted);
    })

    it('fails on invalid json template literal, without schema', () => {

        expect(() => json(undefined)`rubbish`).toThrow();
    })
})