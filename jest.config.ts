import type { Config } from 'jest'
import nextJest from 'next/jest'

const createJestConfig = nextJest({
    dir: './', // Path to your Next.js app directory
})

const customJestConfig: Config = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['html', 'text-summary', 'json-summary'],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    testEnvironment: 'node',
    verbose: true,
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@t3-oss/env-nextjs$': '<rootDir>/__mocks__/@ts-oss/env-nextjs.js',
        '^@lottiefiles/dotlottie-react$': '<rootDir>/mocks/lottieFilesMock.js',
        '^@lottiefiles/dotlottie-web$': '<rootDir>/mocks/lottieFilesMock.js',
    },

    reporters: [
        'default',
        [
            './node_modules/jest-html-reporter',
            {
                pageTitle: 'Test Report',
                outputPath: './coverage/jest/test-report.html',
                sort: 'status',
            },
        ],
    ],
    transformIgnorePatterns: [
        '/node_modules/(?!(.pnpm/)?(jose|openid-client|next-auth|@panva|@lottiefiles|react/jsx-runtime)|\\.mjs$)',
    ],
    testMatch: [
        '**/__tests__/unit/**/*.ts?(x)',
        '**/__tests__/integration/**/*.ts?(x)',
    ],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
}

module.exports = createJestConfig(customJestConfig)
