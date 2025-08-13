module.exports = {
  preset: "jest-expo",
  testMatch: [
    "**/constants/__tests__/*.test.ts",
    "**/app/__tests__/*.test.tsx",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
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
