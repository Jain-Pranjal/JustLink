// Here we will define all the linting rules for the project

import { FlatCompat } from '@eslint/eslintrc'
import path from 'path'
import { fileURLToPath } from 'url'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

export default [
    {
        ignores: [
            '.next/**',
            'out/**',
            'build/**',
            'next-env.d.ts',
            'node_modules/**',
        ],
    },
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        files: ['**/*.{ts,tsx,js,jsx}'],
        plugins: {
            'simple-import-sort': simpleImportSort,
        },
        rules: {
            // TypeScript and React rules
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
            '@next/next/no-img-element': 'off',

            // Strict import correctness (like flake8)
            'import/no-unresolved': 'error',
            'import/no-duplicates': 'error',
            'import/order': 'off', // we disable default import-order

            // Your import sorting plugin
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
        },
    },
]
