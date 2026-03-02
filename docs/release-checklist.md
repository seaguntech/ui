# Release Checklist

## Pre-release validation

- Run `pnpm verify` from `ui/`
- Run `pnpm verify:visual` from `ui/`
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
- Ensure component changes are mirrored in registry templates
- Update `docs/master-spec.md` status section if phase scope changed
- Ensure at least one `.changeset/*.md` file exists for release changes

## CI and release secrets

- `NPM_TOKEN`: npm automation token for publish workflow
- `GITHUB_TOKEN`: provided by Actions for release PRs and commits
