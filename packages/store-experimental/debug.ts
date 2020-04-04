import './src/configs/test';

// import {Pass, check, checks} from '@cleric/common';
// import {Compute} from 'Any/_api';

// import {BarApi} from './src/configs/test/apis/BarApi';
// import {FooApi} from './src/configs/test/apis/FooApi';
// import {Bar} from './src/configs/test/types/Bar';
import {Foo} from './src/configs/test/types/Foo';
// import {FooBar} from './src/configs/test/types/FooBar';
// import {Unknown} from './src/configs/test/types/Unknown';
import {ApiTypeOf} from './src/node/api/ApiTypeOf';

type actualFoo = ApiTypeOf<'Default', typeof Foo>;
const foo: actualFoo = {} as any;
