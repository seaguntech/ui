import { baseConfig } from './index.js';
import { defineConfig, mergeConfig } from 'vitest/config';

export const nodeConfig = defineConfig(
  mergeConfig(baseConfig, {
    test: {
      environment: 'node',
    },
  }),
);
