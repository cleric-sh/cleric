import 'reflect-metadata';

export const SENSITIVE_METADATA_KEY = Symbol('Sensitive');

/**
 * Indicates that a configuration setting contains sensitive information and should be redacted
 * from logs. Must be applied to class properties.
 */
export function Sensitive() {
  return Reflect.metadata(SENSITIVE_METADATA_KEY, true);
}
