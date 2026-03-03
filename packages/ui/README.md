# @seaguntech/ui

Shared UI component library for Seaguntech.

## Install

```bash
pnpm add @seaguntech/ui
```

## Requirements

- React 19+
- React DOM 19+

## Usage

```tsx
import { Button, Card } from '@seaguntech/ui';
```

```css
@import '@seaguntech/ui/styles.css';
```

The stylesheet includes design tokens and base theme variables from
`@seaguntech/design-system`.

## Package Exports

- `@seaguntech/ui`: React components and utilities.
- `@seaguntech/ui/styles.css`: shared base styles and design tokens.

## Development

From the monorepo root:

```bash
pnpm --filter @seaguntech/ui build
pnpm --filter @seaguntech/ui test
```

## License

MIT
