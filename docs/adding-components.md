# Adding Components Guide

## 1) Create package component

- Add component in `packages/ui/src/components/<name>.tsx`
- Export it from `packages/ui/src/index.ts`

## 2) Create registry template

- Add registry-ready source in `apps/www/registry/seaguntech-ui/ui/<name>.tsx`
- Use consumer-facing imports (for example `@/lib/utils`, `@/components/ui/button`)

## 3) Register metadata

- Add item in `apps/www/registry/registry-ui.ts`
- Define:
  - `name`, `type`, `description`
  - `dependencies` (npm packages)
  - `registryDependencies` (other registry items)
  - `files` mapping with `path`, `type`, `target`

## 4) Optional docs grouping

- Update `apps/www/lib/component-catalog.ts` to include the new item in a group.

## 5) Validate

- Run `pnpm build:registry`
- Run `pnpm test`
- Run `pnpm check-types`
- Run `pnpm build`
