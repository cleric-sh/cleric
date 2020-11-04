module.exports = {
  env: {
    "jest": true
  },
  extends: "./node_modules/gts/",
  overrides: [
    {
      // Rules specifically for typescript files.
      files: [
        "*.ts",
        "*.tsx"
      ],
      rules: {
        // In typescript, the no-undef rule returns false positives when working with types and interfaces.
        // https://github.com/typescript-eslint/typescript-eslint/issues/342
        "no-undef": "off"
      }
    },
    {
      // Rules specifically for typescript test & spec files.
      files: [
        "*.spec.ts",
        "*.test.ts",
        "*.spec.tsx",
        "*.test.tsx"
      ],
      rules: {
        // In typescript, the no-undef rule returns false positives when working with types and interfaces.
        // https://github.com/typescript-eslint/typescript-eslint/issues/342
        "node/no-unpublished-import": "off"
      }
    }
  ],
  plugins: [
    "jest"
  ],
  rules: {},
}