# Seaguntech UI Workspace

Mini-monorepo for a shadcn-compatible custom registry and UI package.

## Workspaces

- `packages/design-system`
- `packages/ui`
- `packages/cli`
- `apps/www`

## Commands

```bash
pnpm install
pnpm build:registry
pnpm validate:registry
pnpm verify
pnpm verify:visual
pnpm dev
pnpm --filter @seaguntech/cli build
```

Registry output is generated into `apps/www/public/r`.

## Public Packages

- `@seaguntech/design-system`
- `@seaguntech/ui`
- `@seaguntech/cli`

CLI quick usage:

```bash
pnpm --package=@seaguntech/cli@latest dlx seagun components add button
```

## Documentation

- Master plan: `docs/master-spec.md`
- Troubleshooting: `docs/troubleshooting.md`
- Adding components: `docs/adding-components.md`
- Release checklist: `docs/release-checklist.md`

## Automation

- CI verify workflow: `.github/workflows/ci.yml`
- Visual regression workflow: `.github/workflows/visual-regression.yml`
- Release workflow: `.github/workflows/release.yml`
