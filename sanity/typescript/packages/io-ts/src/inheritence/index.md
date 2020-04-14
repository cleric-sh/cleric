# Inheritence / assignability between io-ts types.

## 'Natural' comparison / extensibility
'Natural' refers to the regular, covariant extensibility.
E.g. For Cat -> Animal, when checking `Extends<Cat, Animal>` we would expect `1`.

## Findings
You can't compare ___C classes for extensibility as per their props.

You can compare ___Type classes for extensibility as per their props.

CS (Tuple of types) cannot be compared naturally.

Props can be compared naturally.