module.exports = {
  preset: 'ts-jest',

  // JSDOM is a browser-like environment, exposing APIs
  // like window and performance.
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
};
