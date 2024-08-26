module.exports = {
    testEnvironment: 'jsdom',
    preset: "react-native",
    testMatch: [
      "<rootDir>/__tests__/**/*.js",
      "**/?(*.)(spec|test).js?(x)"
    ],
    moduleFileExtensions: [
      "ts",
      "tsx",
      "js",
      "jsx",
      "json",
      "node"
    ],
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__tests__/app/__mocks__/imageMock.ts"
    },
    // transformIgnorePatterns: [
    //   'node_modules/react-native',
    //   'node_modules/(?!@react-native|react-native)'
    // ],
    testPathIgnorePatterns: [
      "<rootDir>/__tests__/setup.ts",
      "<rootDir>/__tests__/mountWithContext.js",
      "<rootDir>/__tests__/app/__mocks__/imageMock.ts"
    ],
    setupFiles: [
      "<rootDir>/__tests__/setup.ts"
    ],
    collectCoverage: false,
    collectCoverageFrom: [
      "src/**/*.{ts,tsx}"
    ],
    verbose: true,
  };