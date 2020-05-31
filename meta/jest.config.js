module.exports = {
  displayName: 'meta',
  moduleNameMapper: {
    '@cleric/(.*)': '<rootDir>/../packages/$1/src/index.ts',
  },
  name: 'meta',
  preset: 'ts-jest',
  testEnvironment: 'node',
};
