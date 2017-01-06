module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "promise"
    ],
    "rules": {
        // require parens around arrow function arguments, ex: `(a) => a;`
        "arrow-parens": [
            "error",
            "always"
        ],

        // indent 2 spaces
        "indent": [
            "error",
            2
        ],

        // require unix-style line breaks in the file
        "linebreak-style": [
            "error",
            "unix"
        ],

        // warn about using console statements
        "no-console": 0,

        // strings should use single quotes instead of double
        "quotes": [
            "error",
            "single"
        ],

        // always require semi-colons
        "semi": [
            "error",
            "always"
        ],

        // require curly braces at all times
        "curly": 2,

        // must call `super()` before using this in a class constructor when the
        // class extends another
        "no-this-before-super": 2,

        // require spaces around arrow when making arrow function
        "arrow-spacing": 2,

        // prefer spread instead of using fn.apply, ex: `Math.max(...[1,2,3])`;
        "prefer-spread": 2,

        // allow useless escape
        "no-useless-escape": 0,

        // don't require spaces around curly braces `{foo}`, not `{ foo }`
        "object-curly-spacing": [
            2,
            "never"
        ],

        // warning (1) when throwing literal string
        "no-throw-literal": 1,

        // don't allow using functions before them being defined (don't rely on hoisting).
        "no-use-before-define": 0,

        // don't worry about arrow body style for functions.
        "arrow-body-style": 0,

        // 2 rules that have no definition?
        "no-global-assign": 0,
        "no-unsafe-negation": 0,

        // functions/objects being `new`ed need to be uppercase, ex: `let f = new Thing()`
        "new-cap": [
            2,
            {
                "newIsCap": true,
                "capIsNew": false
            }
        ],

        // don't allow unused variables/params unless they are prefixed with 2 underscores
        "no-unused-vars": [
            2,
            {
                "args": "all",
                "argsIgnorePattern": "^__",
                "varsIgnorePattern": "^__"
            }
        ]
    }
};
