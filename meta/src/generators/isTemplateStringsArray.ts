export const isTemplateStringsArray = (
  value: unknown
): value is TemplateStringsArray => Array.isArray(value) && !!value['raw'];
