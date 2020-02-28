import { json } from './json';
import { packageSchema, Package } from '../schemas/json/package';

export const packageJson = json<Package>(packageSchema);