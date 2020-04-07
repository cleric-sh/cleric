import {ApiTypes} from './ApiTypes';

/**
 * The union of all ApiKeys for all Apis registered in ApiTypes.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiKey = keyof ApiTypes<any, any>;
