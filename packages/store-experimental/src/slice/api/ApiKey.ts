import { ApiTypes } from './ApiTypes';

/**
 * The union of all ApiKeys for all Apis registered in ApiTypes.
 */
export type ApiKey = keyof ApiTypes<any, any>;
