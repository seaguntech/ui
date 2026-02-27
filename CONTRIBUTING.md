# Contributing

Thanks for contributing! This repository is the Seagun Tech UI monorepo template.

## Development Setup

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm lint`
- `pnpm check-types`
- `pnpm test`
- `pnpm build`

## Changesets

We use Changesets for versioning packages:

```bash
pnpm changeset
```

## Commit Messages

Follow Conventional Commits:

```
feat: add new component
fix: handle edge case
```

## Pull Requests

- Keep PRs focused and small when possible.
- Add tests for new behavior.
- Update docs for user-facing changes.
- Ensure CI passes (lint/typecheck/test/build).

## Branching

- Use short-lived feature branches.
- Prefix with `feat/`, `fix/`, or `chore/`.

## Review checklist

- [ ] Changeset added when publishing packages
- [ ] Tests updated or added
- [ ] Docs updated
- [ ] No breaking changes without notice
