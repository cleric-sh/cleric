

## Property '...' of exported class expression may not be private or protected.ts(4094)
This occurs when code such as:
```
export function test() {
  return class MyTestClass {
    private foo = 0;
  };
}
```

is written with compilerOptions `declaration: true`.

Reasoning for this behavior is outlined here: https://github.com/microsoft/TypeScript/issues/30355

### Error does not appear when noEmit: true.
This causes VSCode to report the error, whilst tsc with -w --noEmit (used for project-wide error detection) doesn't.

More info: https://github.com/microsoft/TypeScript/issues/37769