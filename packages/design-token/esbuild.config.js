import run from '@jobis/esbuild-config';
import pkg from './package.json' assert { type: 'json' };

run({ pkg });
