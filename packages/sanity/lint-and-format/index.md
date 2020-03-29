# Linting and formatting

## Linting

It's pretty much eslint vs tslint.

### TSLint
TSLint:
 - is slower
 - is more comprehensive for typescript rules
 - doesn't support other languages
 - is being abandoned by the typescript team, in favour of eslint
 - is being abandoned by Google, in favour of eslint (as of v2 of gts)

### ESLint
ESLint:
 - has a fundamentally more performance architecture
 - is not as comprehensive as tslint, but typescript team is working on it
 - supports other languages too
 - appears to be the current standard being converge upon

 ## Formatting

 Main players are prettier or clang-format.

 ### Prettier
 Prettier:
  - Sucks at formatting, is stupid and lacks configurability
  - "You'll hate what it does to your code, but love what it does to your colleague's..."
  - "When pretty can't format my code nicely, usually it means I need to refactor my code..."
  - Works at the AST level to understand and restructure your code
  - Works pretty seamlessly with typescript (i.e. doesn't get confused and mangle your code)

  ### clang-format
  clang-format:
   - Has far more configurability than prettier.
   - Originally designed for C/C++, and options are oriented towards them.
   - Has options to format javascript, but with limited features.
   - Does not interpret the AST of the language.
   - Is prone to misunderstanding typescript - it mangled my code badly at least once.
   - Was abandoned by Google in favour of prettier as of v1 of gts.

## Recommendation: GTS v2, eslint, prettier

Extend GTS v2, which is build on top of eslint and prettier.