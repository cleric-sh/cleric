import {ConfigurationError} from './ConfigurationError';

export class MissingSourceError extends ConfigurationError {
  constructor(sourceKey: string, pathFromRoot: string[]) {
    const pathString = pathFromRoot.join('.');
    const message = `Configuration setting '${pathString}' expects source '${sourceKey}' to be provided, but it wasn't.`;
    super(message);
  }
}
