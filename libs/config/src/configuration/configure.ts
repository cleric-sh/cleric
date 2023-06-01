import {Selector, select} from './select';

export interface ILogger {
  (message: string): void;
}

export interface IConfigArgs {
  logger?: ILogger;
}

export function configure<TArgs extends IConfigArgs, TConfig extends Object>(
  config: (args: TArgs) => TConfig,
  defaultArgs: TArgs
) {
  return function <TSelector extends Selector<TConfig>>(
    requires: TSelector,
    args: TArgs = defaultArgs
  ) {
    const configuration = config(args);
    const {logger} = args;

    const [selected, loggable] = select(configuration, requires, !!logger);

    if (logger) {
      const json = JSON.stringify(loggable, null, 2);
      logger(`SELECTED CONFIGURATION: ${json}`);
    }

    return selected;
  };
}
