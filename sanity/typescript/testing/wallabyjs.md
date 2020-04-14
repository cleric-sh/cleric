# Wallabyjs

Wallabyjs supports automatic configuration, which means that you shouldn't need a wallaby.config.js file in most cases.

It assumes that you have a working jest configuration and it runs that. Basically, if you can't ´yarn run jest´ then wallaby won't work either.

## Common problems and solutions

### [Error] Runtime error: undefined [typescript]
When typescript compile-level errors occur e.g. in ts-jest, wallabyjs will not report these error gracefully.
Often, running jest from command line (yarn jest) will reveal more information.

#### Common causes
When working with typescript and jest in wallaby, and noEmitOnError: true, any typescript compile-time errors will cause jest to
emit the obscure, unhelpful error: '[Error] Runtime error: undefined'.

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