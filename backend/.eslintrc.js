module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": "error",
        "semi-style": ["error", "last"],
        "camelcase": [0, {properties: "never"}],
        "global-require": [0],
        "max-len":  ["error", { "code": 120, "tabWidth": 4 }],
        "quotes": ["error", "single"]
    },
};
