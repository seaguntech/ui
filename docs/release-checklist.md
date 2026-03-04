# Release Checklist

## Pre-release validation

- Run `pnpm verify` from `ui/`
- Run `pnpm verify:visual` from `ui/`
- Run `pnpm --filter @seaguntech/cli lint`
- Run `pnpm --filter @seaguntech/cli check-types`
- Run `pnpm --filter @seaguntech/cli test`
- Run `pnpm --filter @seaguntech/cli build`
- Confirm registry artifacts exist in `apps/www/public/r`
- Verify sample endpoints:
  - `/r/registry.json`
  - `/r/registries.json`
  - `/r/button.json`
  - `/r/voice-assistant-01.json`

## Docs validation

- Check docs routes:
  - `/docs`
  - `/docs/components/[name]`
  - `/docs/blocks`
  - `/docs/examples`
  - `/docs/registry`
  - `/view/[name]`

## Publish readiness

- Ensure `@seaguntech/ui` build output is up-to-date (`packages/ui/dist`)
- Ensure `@seaguntech/design-system` metadata is ready for public publish
- Ensure `@seaguntech/cli` metadata and README are ready for npm
- Ensure component changes are mirrored in registry templates
- Ensure at least one `.changeset/*.md` file exists for release changes

## Metadata quality checks

- Verify package fields: `description`, `license`, `repository`, `bugs`, `homepage`, `keywords`, `engines`
- Verify `publishConfig.access` is `public` for published packages
- Verify `files` whitelist is minimal and excludes local-only artifacts
- Verify READMEs include install + usage + requirements

## CI and release secrets

- `NPM_TOKEN`: npm publish token that bypasses OTP for CI publishing
- `GITHUB_TOKEN`: provided by Actions for release PRs and commits
- `CHANGESETS_GH_TOKEN`: PAT used by Changesets to open release PRs that
  trigger required checks (`verify`, `visual`)
