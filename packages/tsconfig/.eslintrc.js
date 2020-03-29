module.exports = {
  extends: "./node_modules/gts/",
  plugins: [
    "jest"
  ],
  env: {
    "jest": true
  },
  rules: {},
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
      // Rules specifically for typescript files.
      files: [
        "*.spec.ts",
        "*.spec.tsx"
      ],
      rules: {
        // In typescript, the no-undef rule returns false positives when working with types and interfaces.
        // https://github.com/typescript-eslint/typescript-eslint/issues/342
        "node/no-unpublished-import": "off"
      }
    }
  ],
}