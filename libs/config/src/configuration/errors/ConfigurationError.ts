export class ConfigurationError extends Error {
  constructor(public readonly message: string) {
    super(message);
  }
}
