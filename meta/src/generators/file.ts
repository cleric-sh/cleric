export type File = {
  (
    value: TemplateStringsArray,
    ...placeholders: (string | Promise<string>)[]
  ): Promise<string>;
};

export const file: File = async (value, ...placeholders) => {
  const placeholderValues = await Promise.all(placeholders);

  let result = '';

  // interleave the literals with the placeholders
  for (let i = 0; i < placeholders.length; i++) {
    result += value[i];
    result += placeholderValues[i];
  }

  // add the last literal
  result += value[value.length - 1];
  return result;
};
