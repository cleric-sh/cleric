import {f} from '../../spec/file/f';
export const Config = (numbers: number[]) => {
  const imports = numbers
    .map(i => `import {Type${i}Api} from './apis/Type${i}Api';`)
    .join('\n');
  const apis = numbers.map(i => `Type${i}Api`).join(', ');
  return f(
    `PerfConfig.ts`,
    `import {createConfig} from '@cleric/store-experimental/src/config';

import {RootApi} from './apis/RootApi';
${imports}

export const PerfConfig = createConfig('Perf', {
  apis: [RootApi, ${apis}],
  slice: 'PerfSlice',
});

declare module '@cleric/store-experimental/src/config' {
  export interface ConfigTypes {
    Perf: typeof PerfConfig;
  }
}
`
  );
};
