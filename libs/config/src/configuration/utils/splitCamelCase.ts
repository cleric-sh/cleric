const SplitCamelCaseRegex = /([A-Z][A-Z]+|[a-zA-Z][a-z]*|[0-9]+)/g;

export const splitCamelCase = (value: string) => {
  return value.match(SplitCamelCaseRegex);
};
