module.exports = {
  verbose: true,
  testRegex: [".*\\.(test|spec).(ts|js)$"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.json",
        diagnostics: true,
      },
    ],
  },
  moduleFileExtensions: ["ts", "js", "json"],
  moduleDirectories: ["node_modules"],
  preset: "ts-jest",
  setupFiles: ["dotenv/config"],
  testMatch: null,
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.{js,jsx,tsx,ts}", "!**/node_modules/**", "!**/vendor/**"],
  coverageReporters: ["json", "lcov"],
};
