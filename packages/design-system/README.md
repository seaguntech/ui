# @seaguntech/design-system

Tailwind CSS v4 token package for Seaguntech UI.

## What this package owns

- Design tokens (`@theme`) and semantic color variables.
- Light and dark theme variable assignments.
- Global base styles (font, focus ring, base surface/foreground behavior).
- Shared PostCSS config export for Tailwind v4.

This package is the single source of truth for design tokens and theme variables.

## Recommended usage

If you use `@seaguntech/ui` components, import the UI stylesheet only:

```css
@import '@seaguntech/ui/styles.css';
```

`@seaguntech/ui/styles.css` already imports `@seaguntech/design-system`.

If you need tokens/theme without component styles, import design-system directly:

```css
@import '@seaguntech/design-system';
```

## Best practices

- Do not redefine core theme tokens in app-level `globals.css`.
- Prefer semantic tokens from this package (`--color-background`, `--color-foreground`, etc.).
- Keep theme overrides centralized in `theme-light.css` and `theme-dark.css`.
