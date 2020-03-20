import { Observable } from 'rxjs';
import { ConfigKey } from '../config';
import { ApiNode } from '../node/ApiNode';
import * as t from 'io-ts';

export class StoreNode<TConfigKey extends ConfigKey, T extends t.Any> extends ApiNode<TConfigKey, T> {
    constructor(public $configKey: TConfigKey, public $type: T, public $: Observable<t.TypeOf<T>>) {
        super($configKey, $type);
    }
}
