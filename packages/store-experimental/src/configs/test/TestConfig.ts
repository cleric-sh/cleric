import { createConfig } from '../../config';
import { FooApi } from './apis/FooApi';
import { BarApi } from './apis/BarApi';

export const TestConfig = createConfig('Test', { apis: [FooApi, BarApi], slice: 'TestSlice' });

declare module '../../config' {
    export interface ConfigTypes {
        Test: typeof TestConfig;
    }
}
