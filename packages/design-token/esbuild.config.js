const esbuild = require('esbuild');
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');

esbuild
    .build({
        entryPoints: ['index.ts'],
        outdir: 'dist',
        format: 'cjs',
        bundle: true,
        platform: 'node',
        plugins: [pnpPlugin()],
    })
    .catch(() => process.exit(1));
