import {Tsconfig, tsconfigSchema} from '../schemas/json/tsconfig';

import {json} from './json';

export const tsconfigJson = json<Tsconfig>(tsconfigSchema);