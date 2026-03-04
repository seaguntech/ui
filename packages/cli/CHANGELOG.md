# @seaguntech/cli

## 0.1.4

### Patch Changes

- 10bc8f9: Use a single CLI binary to support direct `pnpm dlx @seaguntech/cli@latest ...`
  usage and align docs commands across pnpm/npm/yarn/bun.

## 0.1.3

### Patch Changes

- 22d3dbb: Make `components add` idempotent by skipping existing files when the generated
  content is unchanged, instead of failing on repeated installs.

## 0.1.2

### Patch Changes

- 2bceedc: Fix generated file placement for `src`-based Next.js projects and improve
  dependency installation by inferring missing external imports from generated
  files.

## 0.1.1

### Patch Changes

- 2758327: Fix runtime ESM compatibility in the CLI by using `fs-extra` default imports,
  and update pnpm usage docs to run the explicit `seagun` binary.
