# Seaguntech UI Registry - Master Spec

## 1) Muc tieu du an

Xay dung lai mot UI component library theo core concept tuong tu ElevenLabs UI:

- Custom registry build tren top of `shadcn/ui`
- Co kha nang phat hanh component qua JSON endpoint (`/r/*.json`)
- Co package su dung truc tiep (`@seaguntech/ui`)
- Co docs/playground de preview va huong dan consume
- Dong bo visual language voi core styling tham chieu tu `seaguntech-monorepo-template` va `dev-speak`

## 2) Pham vi (Scope)

### In-scope

- Scaffold mini-monorepo trong `ui/`
- `packages/design-system` (Tailwind v4 + tokens + themes)
- `packages/ui` (shadcn-based primitives + Seaguntech components)
- `apps/www` (docs + registry host `/r/*.json`)
- Script build/validate registry
- Tai lieu su dung va quy trinh phat hanh

### Out-of-scope (giai doan dau)

- Day du so luong components nhu ElevenLabs
- CI/CD production deployment hoan chinh
- Public npm release automation day du

## 3) Nguyen tac kien truc

1. **Shadcn-compatible first**
   - Metadata + output phai tuong thich schema va workflow `shadcn add <url>`.
2. **Design system as source of truth**
   - Mau sac, typography, spacing, radius, shadow, motion thong qua CSS variables.
3. **Registry and package dual-distribution**
   - Cung mot nguon component, phat hanh qua:
     - NPM package (`@seaguntech/ui`)
     - Registry JSON (`/r/*.json`)
4. **Incremental + testable**
   - Moi phase co output chay duoc, typecheck/lint/test pass.

## 4) Cau truc thu muc muc tieu

```txt
ui/
  apps/
    www/
      app/
      public/r/
      registry/
      scripts/
  packages/
    design-system/
      globals.css
      design-tokens.css
      theme-light.css
      theme-dark.css
    ui/
      src/components/
      src/lib/
      src/styles/
  docs/
    master-spec.md
```

## 5) Tech stack de xuat

- Monorepo: `pnpm` + `turbo`
- UI package: React 19, TypeScript strict, `class-variance-authority`, `tailwind-merge`, Radix primitives
- Styles: Tailwind CSS v4 + custom design tokens
- Docs app: Next.js App Router
- Registry tooling: Node scripts (`tsx`) + `shadcn/schema` validation
- Quality: ESLint, Prettier, Vitest

## 6) Feature set giai doan V1

### 6.1 Foundation components (uu tien)

- `button`
- `input`
- `label`
- `card`
- `textarea`
- `badge`
- `separator`

### 6.2 Composite/Signature components (de chung minh custom concept)

- `voice-button` (moc demo interaction)
- `waveform` (UI visualization)
- `conversation` (message layout primitive)

### 6.3 Registry artifacts

- `/r/<name>.json` cho tung component
- `/r/all.json` tong hop
- `registry.json` index tong

## 7) Lo trinh trien khai (Implementation phases)

### Phase 1 - Workspace Foundation

- Khoi tao workspace files: `package.json`, `pnpm-workspace.yaml`, `turbo.json`
- Tao `packages/design-system` voi token va theme baseline
- Tao `packages/ui` voi utility `cn`, export setup, build setup

**Done khi:** `pnpm -w build` chay qua cho foundation packages.

### Phase 2 - UI Core Package

- Them primitives uu tien (button/input/label/card/...)
- Standardize typing, variant API, class contracts
- Export map va styles import (`@seaguntech/ui/styles.css`)

**Done khi:** component import duoc tu package va tests co ban pass.

### Phase 3 - Registry Engine

- Tao `apps/www/registry/*` metadata source
- Viet scripts build:
  - generate registry index
  - generate per-component JSON
  - generate all.json
  - validate schema
- Rewrite import path de output dung target structure

**Done khi:** `shadcn add <local/hosted-url>` nhan duoc component hop le.

### Phase 4 - Docs + Preview App

- Next.js app route docs
- Component preview pages
- Copy command snippets
- Simple navigation cho Components/Blocks/Guides

**Done khi:** truy cap docs local, xem preview, tai JSON registry duoc.

### Phase 5 - Hardening

- Lint/format/typecheck/test full workspace
- Bo sung README + troubleshooting
- Chot conventions cho adding new component

**Done khi:** quality gate pass, tai lieu day du de handoff.

## 8) Build & QA gates

Moi phase can dat:

- `lint` pass
- `check-types` pass
- `test` pass (muc tieu coverage cho utilities va scripts critical path)
- Build output dung (`dist`, `public/r/*.json`)

## 9) Tieu chuan styling va theming

- Reuse tinh than token architecture tu `seaguntech-monorepo-template`:
  - semantic tokens (`--color-background`, `--color-foreground`, ...)
  - component compatibility tokens (`--color-card`, `--color-muted`, `--color-ring`, ...)
- Ho tro light/dark qua class `.dark`
- Utility classes an toan, han che conflict voi utility mac dinh
- Focus ring va accessibility states la bat buoc tren interactive components

## 10) Rui ro & giam thieu

1. **Schema drift voi shadcn**
   - Giam thieu: validate output bang `shadcn/schema` trong script.
2. **Import rewrite sai duong dan**
   - Giam thieu: test snapshot cho output JSON component mau.
3. **Style mismatch giua package va docs app**
   - Giam thieu: docs app import cung mot `@seaguntech/ui/styles.css`.
4. **Monorepo config phuc tap ban dau**
   - Giam thieu: bat dau toi thieu, mo rong sau moi phase.

## 11) Definition of Done (toan du an V1)

- Co workspace `ui/` hoat dong on dinh
- Co package `@seaguntech/ui` voi n primitives + signature components
- Co registry JSON build pipeline va endpoint host
- Co docs/playground de preview va huong dan consume
- Co tai lieu dong gop component moi

## 12) Ke hoach ngay tiep theo (next immediate execution)

1. Scaffold workspace trong `ui/` (root config + package skeleton).
2. Setup `packages/design-system` baseline.
3. Setup `packages/ui` baseline + 4 component dau tien (`button`, `input`, `label`, `card`).
4. Tao `apps/www` toi thieu de host `/r` va docs route co ban.
5. Implement script registry generation V0.

## 13) Trang thai trien khai hien tai

- Hoan thanh scaffold mini-monorepo trong `ui/`
- Hoan thanh foundation cho `packages/design-system`, `packages/ui`, `apps/www`
- Hoan thanh registry pipeline co build + validate schema
- Hoan thanh component set mo rong:
  - primitives: `button`, `input`, `label`, `card`, `badge`, `separator`, `textarea`
  - composite/signature: `voice-button`, `waveform`, `conversation`
  - interactive primitives moi: `tabs`, `dialog`, `dropdown-menu`
- Hoan thanh docs nang cao hon:
  - grouped component catalog
  - component detail page co live preview playground
  - registry guide page (`/docs/registry`)
- Hoan thanh block va example registry V1:
  - blocks: `voice-assistant-01`, `workspace-quick-actions-01`
  - examples: `dialog-demo`, `voice-button-demo`, `tabs-demo`
- Hoan thanh test hardening cho registry scripts:
  - `apps/www/tests/registry-build.test.ts`
  - xac nhan build output + schema validation pass
- Hoan thanh preview route va docs bo sung:
  - isolated preview route: `/view/[name]`
  - source tab tren trang chi tiet component
  - docs blocks/examples routes
- Hoan thanh tai lieu handoff:
  - `docs/troubleshooting.md`
  - `docs/adding-components.md`
  - `docs/release-checklist.md`
- Hoan thanh quality command tong hop: `pnpm verify`
- Hoan thanh post-V1 enhancement track:
  - CI workflow verify: `ui/.github/workflows/ci.yml`
  - visual regression workflow: `ui/.github/workflows/visual-regression.yml`
  - release workflow + changesets: `ui/.github/workflows/release.yml`, `.changeset/*`
  - visual baseline snapshots: `apps/www/tests/visual/view-routes.spec.ts-snapshots/*`
- Da verify `pnpm build:registry`, `pnpm check-types`, `pnpm build` deu pass

## 14) Phase tracking

- [x] Phase 1 - Workspace Foundation
- [x] Phase 2 - UI Core Package
- [x] Phase 3 - Registry Engine
- [x] Phase 4 - Docs + Preview App
- [x] Phase 5 - Hardening

## 15) Post-V1 enhancement tracking

- [x] CI workflow cho `pnpm verify`
- [x] Visual regression/screenshot pipeline cho `/view/[name]`
- [x] Publish flow cho `@seaguntech/ui` bang Changesets

## 16) Template merge migration tracking

- [x] M1 - Prune workspace theo scope `ui-implemented`
  - removed: `apps/web`, `apps/storybook`, `packages/logger`, `packages/utils`
  - kept: `apps/www`, `packages/design-system`, `packages/ui`
- [x] M2 - Giu root config cua `ui`, chi update toi thieu can thiet
  - updated root scripts trong `package.json`
  - simplified catalogs/dependencies in `pnpm-workspace.yaml`
  - updated `turbo.json` tasks/outputs cho pipeline moi
  - khong them `tsconfig.base.json`; reuse `configs/typescript-config/base.json` va them `jsx` override can thiet
- [x] M3 - Dong bo workflows tu `ui-implemented`
  - synced: `.github/workflows/ci.yml`, `.github/workflows/visual-regression.yml`, `.github/workflows/release.yml`
- [x] M4 - Migrate source code tu `ui-implemented` vao `ui`
  - synced: `apps/www`, `packages/design-system`, `packages/ui`, `docs`
  - excluded generated artifacts (`node_modules`, `.next`, `.turbo`, `dist`, `playwright-report`, `test-results`)
- [x] M5 - Dependency cleanup + validation
  - `pnpm install`, `pnpm verify`, `pnpm verify:visual` passed
- [x] M6 - Cap nhat planning va danh dau phase hoan thanh
