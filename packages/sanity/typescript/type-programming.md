# Type programming

## Writing performant type code
From github issue: https://github.com/pirix-gh/ts-toolbelt/issues/102

### 50 instruction limit
Typescript limits instantiation of type aliases to 50 per evaluation.

### Deferring computation on recursive types.
Also known as: `extends infer X` syntax.

This syntax defers typescript's evaluation of a type until we've received type parameters.
Without it, typescript evaluates the full range of all types in their full depth, which causes performance issues.

This can also force typescript to 'compute step by' when you get 'Type instantiation is excessively deep and possibly infinite'.

See discussion here: https://github.com/pirix-gh/ts-toolbelt/issues/5
And example here: https://github.com/pirix-gh/ts-toolbelt/blob/0182a00/src/Object/Assign.ts