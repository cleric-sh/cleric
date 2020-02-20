import { json } from "./json"
import { curry } from "ramda"

describe('json', () => {
    it('accepts plain string', () => {
        json(undefined, '{ "test": "value" }')
    })
    it('accepts plain object', () => {
        json(undefined, { test: "value" })
    })
    it('accepts tagged template literals', () => {
        const func = curry(json)(undefined)

        func`
        { "test": "value" }
        `
    })
})