import 'reflect-metadata';

export const AwsSecretKeyMetadataKey = Symbol('AwsSecretKey');

/**
 * Overrides the default secret key for a configuration setting. Can be applied
 * to a class property.
 *
 * @param formatString
 * @constructor
 */
export function AwsSecretKey(formatString: string) {
  return Reflect.metadata(AwsSecretKeyMetadataKey, formatString);
}
