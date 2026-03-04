# Seaguntech UI

Open-source UI ecosystem for Seaguntech with three public packages:

- `@seaguntech/design-system`: Tailwind v4 tokens, themes, and base styles.
- `@seaguntech/ui`: reusable React UI components.
- `@seaguntech/cli`: CLI to pull components from the Seaguntech registry.

## Quick Start (Consumers)

Install UI components:

```bash
pnpm add @seaguntech/ui
```

Use components and shared styles:

```tsx
import { Button } from '@seaguntech/ui';
```

```css
@import '@seaguntech/ui/styles.css';
```

Or add components via CLI:

```bash
pnpm dlx @seaguntech/cli@latest components add button
```

## Repository Structure

- `apps/www`: docs site and hosted registry JSON (`/r/*.json`).
- `packages/design-system`: CSS tokens and theme layers.
- `packages/ui`: React component package.
- `packages/cli`: component installation CLI.
- `docs`: contributor and operational documentation.

## Local Development

Requirements:

- Node.js `>=20`
- pnpm `10.25.0`

Common commands:

```bash
pnpm install
pnpm dev:www
pnpm build:registry
pnpm validate:registry
pnpm verify
```

Registry build output is generated at `apps/www/public/r`.

## Documentation Index

- Contribution guide: `CONTRIBUTING.md`
- Security policy: `SECURITY.md`
- Troubleshooting: `docs/troubleshooting.md`
- Adding components: `docs/adding-components.md`
- Release checklist: `docs/release-checklist.md`

Package docs:

- `packages/design-system/README.md`
- `packages/ui/README.md`
- `packages/cli/README.md`

## Community

- Report bugs or request features: `https://github.com/seaguntech/ui/issues`
- Read code of conduct: `CODE_OF_CONDUCT.md`

## Automation

- CI verify workflow: `.github/workflows/ci.yml`
- Visual regression workflow: `.github/workflows/visual-regression.yml`
- Release workflow: `.github/workflows/release.yml`
