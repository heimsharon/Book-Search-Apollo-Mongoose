module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended', // Add TypeScript support
    ],
    parser: '@typescript-eslint/parser', // Use TypeScript parser
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh', '@typescript-eslint'], // Add TypeScript plugin
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/prop-types': 'off',
    },
};
