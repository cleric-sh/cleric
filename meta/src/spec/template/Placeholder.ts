import {MaybePromise} from '../../util/MaybePromise';
import {Template} from './Template';

/**
 * Important: adding '| Function' forces typescript to ignore those placeholders and
 * allows us to pass lazy self-references to templates without the type resolver getting
 * lost in recursion.
 */
export type Placeholder = MaybePromise<Template | Function | string>;
