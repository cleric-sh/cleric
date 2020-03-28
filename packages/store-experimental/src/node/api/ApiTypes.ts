import * as t from 'io-ts';

import {ConfigKey} from '../../config';

/**
 * A register, by ApiKey, of the types that are used to augment SliceNode for
 * each Api.
 */
export interface ApiTypes<TConfigKey extends ConfigKey, TType extends t.Any> {}
