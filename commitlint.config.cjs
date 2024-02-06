module.exports = {
    extends: [],
    rules: {
        'type-enum': [2, 'always'],
        'colon-not-include': [2, 'always'],
    },
    plugins: [
        {
            rules: {
                'colon-not-include': ({ header }) => {
                    return [header.includes(' :: '), `::이 포함되지 않았습니다.`];
                },
                'type-enum': ({ header }) => {
                    const types = new Set([
                        'build',
                        'ci',
                        'chore',
                        'design',
                        'docs',
                        'feat',
                        'fix',
                        'perf',
                        'refactor',
                        'style',
                        'test',
                        'revert',
                        'merge',
                        'project',
                        'delete',
                    ]);
                    return [
                        types.has(header.split(' :: ')[0]),
                        `${header.split(' :: ')[0]}은 type으로 사용할 수 없습니다.`,
                    ];
                },
            },
        },
    ],
};
