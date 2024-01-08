const esbuild = require('esbuild');
const { pnpPlugin } = require('@yarnpkg/esbuild-plugin-pnp');
import pkg from './package.json' assert { type: 'json' };

const dev = process.argv.includes('--dev');
const minify = !dev;

const watch = process.argv.includes('--watch');

const external = Object.keys({
    ...pkg.dependencies,
    ...pkg.peerDependencies,
});

const baseConfig = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    minify,
    sourcemap: true,
    outdir: 'dist',
    target: 'es2019',
    watch,
    external,
    plugins: [pnpPlugin()],
};

Promise.all([
    esbuild.build({
        ...baseConfig,
        format: 'cjs',
    }),
    esbuild.build({
        ...baseConfig,
        format: 'esm',
        outExtension: { '.js': '.cjs' },
    }),
]).catch(() => {
    console.error('Build failed');
    process.exit(1);
});
