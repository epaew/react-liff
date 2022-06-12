# Unreleased

## Features

## Bug Fixes

- [#424](https://github.com/epaew/react-liff/pull/424)
  - LiffProvider was not passing option `liffConfig.withLoginOnExternalBrowser` to the LIFF SDK.
- [#456](https://github.com/epaew/react-liff/pull/456)
  - `customLogin()` was not passing option `loginConfig.redirectUri` to the original `login()`.

## BREAKING CHANGES

- [#452](https://github.com/epaew/react-liff/pull/452) [#454](https://github.com/epaew/react-liff/pull/454)
  - Dropped supporting `react@16.x`, `react@17.x`.
- [#453](https://github.com/epaew/react-liff/pull/453)
  - Dropped supporting `@line/liff` version 2.19.0 or earlier.

## Others

# 1.6.0

## Features

- [#425](https://github.com/epaew/react-liff/pull/425)
  - Started supporting `react@18.x`.
- [#443](https://github.com/epaew/react-liff/pull/443)
  - Started supporting `@line/liff@2.20`.

## Others

- [#448](https://github.com/epaew/react-liff/pull/448)
  - mv `__tests__/*.test.tsx` to `src/`.

# 1.5.1

## Features

- [#403](https://github.com/epaew/react-liff/pull/403)
  - Started supporting `@line/liff@2.19`.

# 1.5.0

## Features

- [#358](https://github.com/epaew/react-liff/pull/358)
  - Started supporting `@line/liff@2.18`.

## Others

- [#366](https://github.com/epaew/react-liff/pull/366)
  - Update prettier configuration.

# 1.4.0

## Features

- [#347](https://github.com/epaew/react-liff/pull/347)
  - Started supporting `@line/liff@2.17`.

# 1.3.0

## Features

- [#336](https://github.com/epaew/react-liff/pull/336)
  - Started supporting `@line/liff` version from 2.14.x to 2.16.x.

## Others

- [#338](https://github.com/epaew/react-liff/pull/338) [#339](https://github.com/epaew/react-liff/pull/339)
  - Upgrade outdated devDependencies

# 1.2.1

## Bug Fixes

- [#334](https://github.com/epaew/react-liff/pull/334)
  - Import liff object from default export of '@line/liff'. Thanks for @malparty :)

# 1.2.0

## BREAKING CHANGES

- [#306](https://github.com/epaew/react-liff/pull/306)
  - For TypeScript user only: LiffContext returned the `error` as `LiffError | undefined`,
    but now it returns as `unknown` (including `undefined`).

# 1.1.0

## Others

- [#297](https://github.com/epaew/react-liff/pull/297) Started supporting `@line/liff@2.13`.

# 1.0.0

## BREAKING CHANGES

- [#280](https://github.com/epaew/react-liff/pull/280)
  - Started supporting `@line/liff` version 2.11.x and 2.12.0.
  - Dropped supporting `@line/liff` version 2.8.x or earlier.
    - Version 2.9.x and 2.10.x will continue to be supported.
- [#281](https://github.com/epaew/react-liff/pull/281)
  - Removed deprecated `loggedIn` function in LiffContext.

## Others

- CI enhancements.
- Updated some development dependencies.

# 0.9.0

## Others

- [#278](https://github.com/epaew/react-liff/pull/278) Started supporting `@line/liff@2.10`.

# 0.8.0

## Others

- [#232](https://github.com/epaew/react-liff/pull/232) Started supporting `@line/liff@2.9`.

# 0.7.3

## Others

- [#213](https://github.com/epaew/react-liff/pull/213) Started supporting `@line/liff@2.8`.

# 0.7.2

## Others

- [#204](https://github.com/epaew/react-liff/pull/204) Started supporting `@line/liff@2.7`.

# 0.7.1

## Others

- [#169](https://github.com/epaew/react-liff/pull/169) Update .eslintrc to use `@epaew/eslint-config` and fix ESLint errors.
- [#186](https://github.com/epaew/react-liff/pull/186) Refactoring: Introduce the new jsx transform.
- [#191](https://github.com/epaew/react-liff/pull/191) Started supporting `@line/liff@2.6`.

# 0.7.0

## Others

- [#167](https://github.com/epaew/react-liff/pull/167) Started supporting `react@16.14` `react@17.0` and `@line/liff@2.5`.

# 0.6.2

## Bug Fixes

- [#120](https://github.com/epaew/react-liff/pull/120) Get compatible w/ `@line/liff@2.4.1`.

# 0.6.1

## Bug Fixes

- [#113](https://github.com/epaew/react-liff/pull/113) Fixup the version range of `@line/liff` dependency.

# 0.6.0

## Bug Fixes

- [#107](https://github.com/epaew/react-liff/pull/107) Fixup type error with `@line/liff@2.4.0`.

## BREAKING CHANGES

- [#109](https://github.com/epaew/react-liff/pull/109) Rename `loggedIn` in LiffContext to `isLoggedIn`.

# 0.5.0

## Features

- [#45](https://github.com/epaew/react-liff/pull/45) Add `@line/liff` as optionalDependency.

# 0.4.2

## Others

- [#23](https://github.com/epaew/react-liff/pull/23) Change the module specification of tsconfig.json: from es2015 to commonjs.

# 0.4.1

## Others

- [#21](https://github.com/epaew/react-liff/pull/21) Change the target version of tsconfig.json: from ES2019 to ES2015.

# 0.4.0

## Features

- [#14](https://github.com/epaew/react-liff/pull/14) Update the stub implementation: make login state updatable.
- [#15](https://github.com/epaew/react-liff/pull/15) Add `loggedIn` state in LiffContext

# 0.3.0

## Features

- [#10](https://github.com/epaew/react-liff/pull/10)
  - Add new export `createLiffContext<T>()`, for TypeScript user, now you can overload the context type definition of liff object.
  - Define propTypes of `LiffProvider`, for non-TypeScript user.

## Others

- [#10](https://github.com/epaew/react-liff/pull/10)
  - Split the codes.
  - Remove optional dependency of `liff-type`.

# 0.2.0

## Features

- [#2](https://github.com/epaew/react-liff/pull/2) Add export `LiffConsumer`
- [#4](https://github.com/epaew/react-liff/pull/4) Add flag to check "is liff ready?"

## Others

- [#2](https://github.com/epaew/react-liff/pull/2) Move dependency of package `liff-type` from peer to optional
- [#4](https://github.com/epaew/react-liff/pull/4) Add tests
- [#5](https://github.com/epaew/react-liff/pull/5) Update README.md and add CHANGELOG.md

# 0.1.0

Initial release
