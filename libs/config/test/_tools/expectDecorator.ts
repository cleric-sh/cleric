export const expectDecorator = (
  target: Object,
  propertyKey: string,
  metadataKey: Symbol | string,
  metadataValue: string
) => {
  const has = Reflect.hasMetadata(metadataKey, target, propertyKey);
  expect(has).toBe(true);

  const keys = Reflect.getMetadataKeys(target, propertyKey);
  expect(keys[0]).toBe(metadataKey);

  const value = Reflect.getMetadata(metadataKey, target, propertyKey);
  expect(value).toBe(metadataValue);
};
