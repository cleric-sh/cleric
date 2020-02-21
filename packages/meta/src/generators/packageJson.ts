import { curry } from "ramda";
import { json, Json } from './json';
import { packageSchema, Package } from '../schemas/json/package';

export const packageJson = curry(json as Json<Package>)(packageSchema);