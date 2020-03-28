import {Package, packageSchema} from '../schemas/json/package';

import {json} from './json';

export const packageJson = json<Package>(packageSchema);