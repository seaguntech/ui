import { config } from '@seaguntech/eslint-config/base';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...config,
  {
    ignores: [
      '**/dist/**',
      '**/build/**',
      '**/node_modules/**',
      '**/.turbo/**',
      '**/.next/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '*.config.js',
      '*.config.mjs',
    ],
  },
]);
