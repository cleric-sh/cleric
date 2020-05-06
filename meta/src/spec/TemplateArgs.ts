import {MaybePromise} from '../util/MaybePromise';
import {Export} from './Export';
export type TemplateArgs = MaybePromise<Export<string> | Function>[];
