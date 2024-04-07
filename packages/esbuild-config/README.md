# @jobis/esbuild-config
@jobis/esbuild-config는 esbuild를 일일히 설정해줘야하는 문제를 해결하고 간단하게 esbuild를 설정할 수 있습니다.

```
yarn add @jobis/esbuild-config
```

## 형태
```
const run = ({ entryPoints = ["src/index.ts"], pkg, config = {} }) => {
  ...
})
```

## Usage
```js
// ex
import run from '@jobis/esbuild-config';
import pkg from './package.json' assert { type: 'json' };

run({ pkg });
```
- entryPoint: 기본 entryPoint는 src/index.ts입니다. (변경을 원할시 entryPoint: [value]로 변경하면 됩니다.
- pkg: pkg를 통해 dependencies와 peerDependencies 있는 라이브러리를 external에 추가합니다.
- config: esbuild의 세부 설정 변경을 원하는 경우 추가하여 사용할 수 있습니다.
