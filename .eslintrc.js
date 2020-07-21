module.exports = {
    // mode: 'production',
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    // "parser": "babel-eslint",
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "root": true,
    "parserOptions": {
        // sourceType: 'module',
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    parser: "vue-eslint-parser",
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console":"off",
        'no-unused-vars': 'off'
    }
};