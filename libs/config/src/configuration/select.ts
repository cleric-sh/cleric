import {Primitive} from 'Misc/JSON/Primitive';
import 'reflect-metadata';
import {SENSITIVE_METADATA_KEY} from './decorators/Sensitive';
import {ConfigurationError} from './errors/ConfigurationError';

export type Selected<TConfig, TSelector extends Selector<TConfig>> = {
  [P in keyof TSelector]: P extends keyof TConfig ? NonNullable<TConfig[P]> : never;
};

export type Selector<TConfig extends Object> = {
  [P in keyof TConfig]?: TConfig[P] extends Primitive ? boolean : Selector<TConfig[P]>;
};

export function select<TConfig extends Object, TSelector extends Selector<TConfig>>(
  config: TConfig,
  selector: TSelector,
  log = false
): [Selected<TConfig, TSelector>, undefined | Selected<TConfig, TSelector>] {
  // eslint-disable-next-line
  const selected: any = {};
  // eslint-disable-next-line
  const loggable: any = {};

  for (const key in selector) {
    const value = config[key as keyof TConfig];
    const options = selector[key];

    if (typeof options === 'object') {
      const [selectedValue, loggableValue] = select(value, options as Selector<typeof value>);
      selected[key] = selectedValue;
      loggable[key] = loggableValue;
      continue;
    }

    // noinspection SuspiciousTypeOfGuard
    if (typeof options === 'boolean') {
      if (!value && options === true) {
        throw new ConfigurationError(
          `Configuration setting '${key}' was required but not provided by any source.`
        );
      }

      selected[key] = value;

      const isProtected = Reflect.hasMetadata(SENSITIVE_METADATA_KEY, config, key);
      loggable[key] = isProtected ? '[**********]' : value;
    }
  }

  return [selected, loggable];
}
