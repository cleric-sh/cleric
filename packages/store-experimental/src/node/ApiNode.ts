import { Observable } from 'rxjs';
import { ConfigKey } from '../config';
import { decorateNode } from './decorateNode';
import * as t from 'io-ts';

export abstract class ApiNode<TConfigKey extends ConfigKey, T extends t.Any> {
    abstract get $(): Observable<t.TypeOf<T>>;
    constructor(public $configKey: TConfigKey, public $type: T) {
        decorateNode($configKey, $type, this);
    }
}
