# Troubleshooting

## Registry JSON not updating

- Run `pnpm build:registry` from `ui/`
- Confirm files exist in `apps/www/public/r`
- Run `pnpm validate:registry` to check schema validity

## `shadcn add` fails with URL

- Ensure docs app is running: `pnpm dev`
- Verify endpoint opens in browser, for example `http://localhost:3000/r/button.json`
- Check `apps/www/public/r/registries.json` uses the same host/port as your app

## Type errors from registry source templates

- Registry source templates under `apps/www/registry/seaguntech-ui` are generated assets for consumers.
- App typecheck excludes these templates by design; validate them through `build:registry` + schema validation.

## Preview mismatch between package and registry output

- Update both locations when changing a component:
  - `packages/ui/src/components/*`
  - `apps/www/registry/seaguntech-ui/ui/*`
- Re-run: `pnpm build:registry && pnpm build`
