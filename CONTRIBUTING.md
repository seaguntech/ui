# Contributing

Thanks for contributing to Seaguntech UI.

## Prerequisites

- Node.js `>=20`
- pnpm `10.25.0`

## Local Setup

```bash
pnpm install
pnpm dev:www
```

## Development Workflow

1. Create a short-lived branch (`feat/*`, `fix/*`, `chore/*`).
2. Make your change in the appropriate workspace.
3. Run validation commands.
4. Add a changeset when a public package changes.
5. Open a PR with context, tests, and docs updates.

## Validation Commands

Run before opening a PR:

```bash
pnpm lint
pnpm check-types
pnpm test
pnpm build
pnpm build:registry
pnpm validate:registry
```

Full gate used by CI:

```bash
pnpm verify
```

## Changesets and Versioning

This repo uses Changesets for package releases.

```bash
pnpm changeset
```

Add a changeset when changes affect any published package:

- `@seaguntech/design-system`
- `@seaguntech/ui`
- `@seaguntech/cli`

## Commit Convention

Use Conventional Commits.

- `feat: add dialog focus trap`
- `fix: resolve registry import rewrite`
- `docs: improve ui package quickstart`

## Pull Request Checklist

- [ ] Changes are scoped and reviewable
- [ ] Tests are added or updated when behavior changes
- [ ] Documentation is updated for user-facing changes
- [ ] Changeset is added for publishable package updates
- [ ] `pnpm verify` passes locally

## Adding a New Component

Follow `docs/adding-components.md` to update package source, registry templates,
metadata, and validation.
