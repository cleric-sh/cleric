# Jest

## Common problems and solutions

### TypeError: Unable to require .d.ts file [typescript, monorepo, yarn workspaces]
When working in a monorepo with yarn workspaces, and a single root jest configuration, references to other
workspace packages will cause a 'TypeError: Unable to require .d.ts file.' error.

#### Cause
This is because typescript is not treating symlinked node_modules folders the same was as nodejs is. Tsc will, by default,
ignore any code in node_modules and so it expects JS files to exist in node_modules. It doesn't find them 
though because they are symlinked local workspaces, and are yet to be compiled.

Node's behavior is different because it will dereference the symlinks and return the actual path of the workspace, 
and see that they're not actually in 'node_modules' and treat them as local code.

#### More info 
https://github.com/kulshekhar/ts-jest/issues/1336

#### Solution
Set compilerOptions.preserveSymlinks to true in jest's tsconfig.

This means tsc will also dereference the symlinked workspace, see that it's not actually in node_modules and compile the workspace code.

### [Error] Runtime error: undefined [typescript]
When working with typescript and jest, and noEmitOnError: true, any typescript compile-time errors will cause jest to
emit the obscure, unhelpful error: '[Error] Runtime error: undefined'.

#### Cause
Jest seems to rely on the fact that the javascript it is expecting to test actually exists.
When tsc fails to emit javascript, this tends to mess up wallaby and jest pretty badly, interrupting other test runs, 
and preventing results from reaching test reporters. The error itself is vague and doesn't actually display the type error
preventing the js from emitting, and so is not useful. It probably also corrupts the jest cache.

#### More info
None.

#### Solution
Set compilerOptions.noEmitOnError to false in jest's tsconfig.

This ensures that even typescript code with compiler errors will emit javascript and allow jest to run, cache and do all the wonderful
things it was born to do.