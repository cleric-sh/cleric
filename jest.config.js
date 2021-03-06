module.exports = {
  preset: 'ts-jest',

  // JSDOM is a browser-like environment, exposing APIs
  // like window and performance.
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.jest.json',
    },
  },
  testEnvironment: 'jsdom',
};
