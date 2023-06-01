/**
 * Returns true when a property is declared on an object, even if its value is falsey.
 * @param target
 * @param propertyKey
 */
export function isDeclared(target: Object, propertyKey: PropertyKey) {
  return !!Object.getOwnPropertyDescriptor(target, propertyKey);
}
