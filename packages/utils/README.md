# @seaguntech/utils

Shared utility functions for the Seagun Tech UI monorepo.

## Install

```bash
pnpm add @seaguntech/utils
```

## Usage

```ts
import { assertNever, formatDate, invariant } from '@seaguntech/utils';

invariant(user, 'User is required');
console.log(formatDate(new Date()));

type Status = 'idle' | 'loading' | 'done';
const status: Status = 'idle';

switch (status) {
  case 'idle':
  case 'loading':
  case 'done':
    break;
  default:
    assertNever(status);
}
```
