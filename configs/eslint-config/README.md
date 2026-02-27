# @seaguntech/eslint-config

<div align="center">

Shared ESLint configurations for the monorepo.

[![ESLint](https://img.shields.io/badge/ESLint-9.x-4B32C3)](https://eslint.org/)

</div>

---

## 📋 Overview

This package contains shared ESLint configurations used across all packages and applications in the monorepo. It enforces consistent code quality, style, and best practices.

## 📦 Installation

This package is automatically available to workspace packages:

```json
{
  "devDependencies": {
    "@seaguntech/eslint-config": "workspace:*"
  }
}
```

## 🛠 Available Configurations

### `base.js`

The foundational ESLint configuration for TypeScript projects.

```javascript
import { config } from '@seaguntech/eslint-config/base';

export default [...config];
```

### `react.js`

React-specific rules extending the base configuration.

```javascript
import { config } from '@seaguntech/eslint-config/react';

export default [...config];
```

## 💻 Usage

### Flat Config (ESLint 9.x)

In `eslint.config.mjs` or `eslint.config.js`:

```javascript
import { config } from '@seaguntech/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ignores: ['dist', 'node_modules', '*.config.js'],
  },
];
```

### With Custom Rules

```javascript
import { config } from '@seaguntech/eslint-config/base';

export default [
  ...config,
  {
    rules: {
      // Override or add rules
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
```

### React Configuration

```javascript
import { config } from '@seaguntech/eslint-config/react';

export default [
  ...config,
  {
    ignores: ['*.config.js'],
  },
];
```

## ⚙️ Configuration Details

### Base Configuration Includes

- ✅ **TypeScript**: Full TypeScript support with type-aware linting
- ✅ **Import Rules**: Proper import ordering and organization
- ✅ **Code Quality**: Best practices and code quality rules
- ✅ **Security**: Security-focused rules
- ✅ **Performance**: Performance optimization rules

### React Configuration Adds

- ✅ **React Rules**: React-specific linting
- ✅ **React Hooks**: Hooks rules enforcement
- ✅ **JSX**: JSX syntax and formatting rules
- ✅ **Accessibility**: React accessibility rules

## 🎯 Key Rules

### TypeScript Rules

```typescript
// ✅ Correct - Explicit types
function greet(name: string): string {
  return `Hello, ${name}`;
}

// ❌ Wrong - Implicit any
function greet(name) {
  return `Hello, ${name}`;
}
```

### Import Organization

```typescript
// ✅ Correct - Organized imports
import { useState } from 'react';
import { View, Text } from 'react-native';

import { Button } from '@seaguntech/ui/button';
import { useTheme } from '@seaguntech/theme';

import { localHelper } from './utils';

// ❌ Wrong - Unorganized
import { localHelper } from './utils';
import { Button } from '@seaguntech/ui/button';
import { useState } from 'react';
```

### Unused Variables

```typescript
// ✅ Correct - All variables used
const name = 'John';
console.log(name);

// ❌ Wrong - Unused variable
const unused = 'value'; // ESLint error
const name = 'John';
console.log(name);
```

### Console Statements

```typescript
// ⚠️ Warning in production
console.log('Debug info'); // Warning: Unexpected console statement

// ✅ Acceptable for errors
console.error('Error occurred');
console.warn('Warning message');
```

## 📝 Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix"
  }
}
```

### Running Lint

```bash
# Check for linting errors
pnpm lint

# Auto-fix linting errors
pnpm lint:fix

# Lint specific files
eslint src/**/*.ts
```

## 🔧 IDE Integration

### VS Code

Install the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

Add to `.vscode/settings.json`:

```json
{
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### WebStorm / IntelliJ

1. Go to `Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
2. Check "Automatic ESLint configuration"
3. Check "Run eslint --fix on save"

## 📄 .eslintignore

Create a `.eslintignore` file or use `ignores` in config:

```javascript
export default [
  ...config,
  {
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.next',
      '.expo',
      '*.config.js',
      'coverage',
      '.turbo',
    ],
  },
];
```

## 🎨 Rule Categories

### Error Prevention

```typescript
// ✅ Prevents common errors
const obj = { a: 1 };
console.log(obj.a); // ✅

console.log(obj.b); // ⚠️ Warning: Property 'b' doesn't exist
```

### Code Quality

```typescript
// ✅ Enforces best practices
if (condition) {
  doSomething();
} else {
  doSomethingElse();
}

// ❌ Unnecessary else
if (condition) {
  return value;
} else {
  // ESLint: Unnecessary else after return
  return otherValue;
}
```

### React Specific

```typescript
// ✅ Correct React code
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Effect logic
  }, [count]); // ✅ Dependencies specified

  return <View />;
}

// ❌ Missing dependencies
function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
  }, []); // ⚠️ Warning: Missing dependency 'count'
}
```

## 🔄 Pre-commit Integration

ESLint runs automatically via Husky hooks:

```json
{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"]
  }
}
```

## 📚 Best Practices

### 1. Fix Issues, Don't Disable

```typescript
// ❌ Avoid disabling rules
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data: any = fetchData();

// ✅ Fix the underlying issue
interface Data {
  id: string;
  name: string;
}
const data: Data = fetchData();
```

### 2. Use Proper Types

```typescript
// ✅ Explicit types
function processUser(user: User): string {
  return user.name;
}

// ❌ Implicit types
function processUser(user) {
  // ESLint error
  return user.name;
}
```

### 3. Handle Unused Vars

```typescript
// ✅ Use underscore for intentionally unused params
function onClick(_event: Event, data: Data) {
  console.log(data);
}

// ✅ Or destructure only what you need
function onClick({ target }: Event) {
  console.log(target);
}
```

## 🐛 Troubleshooting

### ESLint Not Working

```bash
# Clear ESLint cache
rm -rf node_modules/.cache/eslint

# Reinstall dependencies
pnpm install

# Restart VS Code
```

### Type Information Not Available

Ensure your `tsconfig.json` is properly configured:

```json
{
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Conflicts with Prettier

The config includes `eslint-config-prettier` to disable conflicting rules automatically.

## 📖 Reference

- [ESLint Documentation](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint React](https://github.com/jsx-eslint/eslint-plugin-react)

## 🤝 Contributing

To modify ESLint configuration:

1. Update rules in `packages/eslint-config/base.js` or `react.js`
2. Test across packages: `pnpm lint`
3. Document rule changes
4. Update this README

---

<div align="center">
Part of the Seagun Tech UI monorepo
</div>
