import { json } from './json';
import { tsconfigSchema, Tsconfig } from '../schemas/json/tsconfig';

export const tsconfigJson = json<Tsconfig>(tsconfigSchema);