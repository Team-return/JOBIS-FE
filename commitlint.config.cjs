module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'build :',
                'ci :',
                'chore :',
                'design :',
                'docs :',
                'feat :',
                'perf :',
                'refactor :',
                'style :',
                'test :',
                'revert :',
                'merge :',
                'project :',
                'delete :',
            ],
        ],
    },
};
