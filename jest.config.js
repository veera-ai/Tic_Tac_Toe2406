module.exports = {
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testPathIgnorePatterns: [
    '<rootDir>/.knowledge/',
    '<rootDir>/node_modules/',
  ],
  testMatch: [
    '<rootDir>/src/**/*.test.[jt]s?(x)',
  ],
};
