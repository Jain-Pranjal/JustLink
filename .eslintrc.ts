module.exports = {
    extends: [
        'next/core-web-vitals', // or "react-app", etc.
        'plugin:prettier/recommended', // adds plugin + extends config-prettier
    ],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error', // show Prettier formatting issues as ESLint errors
    },
}

// "plugin:prettier/recommended" automatically includes "eslint-config-prettier" and "eslint-plugin-prettier"
