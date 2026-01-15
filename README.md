![자비스gif](https://private-user-images.githubusercontent.com/103028187/314957954-c0b0b34d-b114-4641-b509-d815f5f98fe8.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3Njg0NTE5NTUsIm5iZiI6MTc2ODQ1MTY1NSwicGF0aCI6Ii8xMDMwMjgxODcvMzE0OTU3OTU0LWMwYjBiMzRkLWIxMTQtNDY0MS1iNTA5LWQ4MTVmNWY5OGZlOC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMTE1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDExNVQwNDM0MTVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jY2IzNjdjOWVkMjQyYmUyN2EzOTM1MGU0MTcxY2I2NWIxNGNhMzNhYTE2MTAxNTBlNDZmZTA1NDcyMGI0NzAzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.VlNvxq8f7yarZfM9nOhqfgDQupWh_Ic4YwYqMem4P8M)

# JOBIS

JOBIS는 대덕소프트웨어마이스터고등학교의 취업 프로세스를 온라인으로 만든 **채용관리 시스템**입니다.

## Frontend

이 레포지토리는 JOBIS 프론트엔드 레포지토리입니다. <br />
현재 JOBIS 프론트엔드는 [Nx](https://nx.dev/) 를 이용한 여러 서비스와 패키지를 하나의 레포지토리에서 관리하는 모노레포 방식을 사용하고 있습니다.

[apps](https://github.com/Team-return/JOBIS/tree/develop/apps): jobis의 여러 웹들을 포함합니다. <br />
[packages](https://github.com/Team-return/JOBIS/tree/develop/packages): jobis 개발에 필요한 공통된 패키지 및 라이브러리를 포함합니다.

## 구조

┗━ apps <br/>
┃ ┗━[@jobis/company](https://github.com/Team-return/JOBIS/tree/develop/apps/company) <br/>
┃ ┗━[@jobis/policy](https://github.com/Team-return/JOBIS/tree/develop/apps/policy) <br/>
┃ ┗━ [@jobis/storybook](https://github.com/Team-return/JOBIS/tree/develop/apps/storybook) <br/>
┃ ┗━ [@jobis/admin](https://github.com/Team-return/JOBIS/tree/develop/apps/admin) <br />
┗━ packages <br/>
┃ ┗━ [@jobis/design-token](https://github.com/Team-return/JOBIS/tree/develop/packages/design-token) <br/>
┃ ┗━ [@jobis/esbuild-config](https://github.com/Team-return/JOBIS/tree/develop/packages/esbuild-config) <br/>
┃ ┗━ [@jobis/icons](https://github.com/Team-return/JOBIS/tree/develop/packages/icons) <br/>
┃ ┗━ [@jobis/ui](https://github.com/Team-return/JOBIS/tree/develop/packages/ui) <br/>
┗━ package.json

## 의존성 그래프

![graph](https://github.com/Team-return/JOBIS-FE/assets/102665117/23fffab8-2c01-4a4a-95d8-de4cccb9d021)

## 명령어

### 시작하기

```
yarn
yarn prepare
```

### 빌드 <br />

> 특정 package 빌드

```
yarn build {{ 패키지명 }}
```

> 모든 package 빌드

```
yarn build:many
```

> 변경 사항이 있는 package만 빌드

```
yarn build:affected
```

### dev 모드

디자인 시스템이나 아이콘의 경우 변경하였을 때 빌드를 진행해야 변경사항이 반영이 됩니다. <br />
하지만 dev 모드를 사용하면 코드 수정 후 실시간 빌드와 패키지 변경사항을 즉각 반영하여 바로 결과를 볼 수 있습니다.

> storybook dev모드

```
yarn dev:storybook
```

> packages dev모드

```
yarn dev:packages
```

### 린트

> eslint

```
yarn lint
```

> stylelint

```
yarn lint:styled
```

test
