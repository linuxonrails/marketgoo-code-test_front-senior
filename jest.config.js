/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    roots: ["<rootDir>/src"],
    testEnvironment: "node",
    // setupFilesAfterEnv: ["./jest.setup.js"],
    verbose: true,
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};
