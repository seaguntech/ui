# @seaguntech/cli

Native CLI for installing Seaguntech UI registry components.

## Quick Start

Install a component:

```bash
pnpm --package=@seaguntech/cli@latest dlx seagun components add button
```

List and search available items:

```bash
pnpm --package=@seaguntech/cli@latest dlx seagun components list
pnpm --package=@seaguntech/cli@latest dlx seagun components search voice
```

Validate local setup:

```bash
pnpm --package=@seaguntech/cli@latest dlx seagun doctor
```

## Commands

- `components add <name...>`: add one or many registry components.
- `components list`: list all items from the registry index.
- `components search <keyword>`: search by name, type, and description.
- `init`: create local CLI config.
- `doctor`: check Node version, project root, and registry connectivity.

## Important Flags

- `--cwd <path>`: target project directory.
- `--registry <url>`: override registry base URL.
- `--yes`: overwrite existing files.
- `--skip-install`: skip package installation step.
- `--dry-run`: preview planned writes and installs.

By default, generated files follow registry targets. If your project uses
`"@/*": ["./src/*"]`, the CLI will automatically write to `src/components/*`
and `src/lib/*` to match your alias.

## Configuration

Initialize local config in a target project:

```bash
pnpm --package=@seaguntech/cli@latest dlx seagun init
```

This writes `.seagun/config.json` with:

```json
{
  "registry": "https://registry-seaguntech.vercel.app"
}
```

Registry URL resolution priority:

1. `--registry`
2. `.seagun/config.json`
3. `REGISTRY_URL`
4. `https://registry-seaguntech.vercel.app`

## Requirements

- Node.js 20+
- A valid JavaScript project with `package.json`

## License

MIT
