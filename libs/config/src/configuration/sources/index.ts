import {Misc} from 'ts-toolbelt';

export interface ISource {
  get(configObject: Object, ...path: string[]): undefined | Misc.JSON.Value;
}

export type SourceKey = 'ConfigFile' | 'PlatformSecret' | 'ProcessEnv' | 'ServicesSecret';

export type Sources = Array<[SourceKey, ISource | undefined]>;

export * from './AwsSecretSource';
export * from './ConfigFileSource';
export * from './ProcessEnvSource';
