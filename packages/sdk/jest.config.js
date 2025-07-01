module.exports = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  // By default, exclude integration tests (they require running API server)
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/tests/integration.test.ts"],
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts" // Exclude index file from coverage as it's just exports
  ]
};
