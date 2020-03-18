import { createConfig } from '../config';
import { FooApi } from './apis/FooApi';

export const TestConfig = createConfig('Test', { apis: [FooApi] });

declare module '../config' {
    export interface ConfigTypes {
        Test: typeof TestConfig;
    }
}
