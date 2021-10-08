module.exports = {
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest'
  },
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
}
