module.exports = {
  preset: "jest-expo",
  testMatch: [
    "**/constants/__tests__/*.test.ts",
    "**/app/__tests__/*.test.tsx",
    "**/components/__tests__/*.test.tsx",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  collectCoverageFrom: [
    "**/constants/*.ts",
    "**/app/*.tsx",
    "!**/node_modules/**",
  ],
  coverageReporters: ["text", "lcov"],
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
};
