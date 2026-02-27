# @seaguntech/logger

Pino-based logger helpers for the Seagun Tech UI monorepo.

## Install

```bash
pnpm add @seaguntech/logger
```

## Usage

```ts
import { createLogger, logger } from '@seaguntech/logger';

logger.info('App started');

const apiLogger = createLogger({ level: 'debug' });
apiLogger.debug({ route: '/health' }, 'health check');
```

## Notes

- Uses `LOG_LEVEL` env var by default.
- Pretty transport is enabled in non-production.
