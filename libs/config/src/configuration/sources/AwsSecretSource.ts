import get from 'lodash.get';
import {getSecretCollection} from 'tibber-aws';
import {AwsSecretKeyMetadataKey} from '../decorators/AwsSecretKey';
import {ConfigurationError} from '../errors/ConfigurationError';
import {ISource} from './index';

export class AwsSecretSource implements ISource {
  private readonly secrets: Record<string, string>;

  constructor(private readonly secretName: string) {
    this.secrets = getSecretCollection(secretName) || {};
  }

  get(configObject: Object, ...readPath: string[]) {
    const propertyName = readPath.pop();
    if (!propertyName) throw new ConfigurationError("'readPath' is empty.");
    const awsSecretKey = Reflect.getMetadata(AwsSecretKeyMetadataKey, configObject, propertyName);
    readPath.push(awsSecretKey || propertyName);
    return get(this.secrets, readPath);
  }
}
