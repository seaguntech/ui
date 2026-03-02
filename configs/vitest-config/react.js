import { baseConfig } from './index.js';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig } from 'vitest/config';

export const reactConfig = defineConfig(
  mergeConfig(baseConfig, {
    plugins: [react({}), tsconfigPaths()],
    test: {
      environment: 'jsdom',
    },
  }),
);

export const getReactAliases = (rootDir) => ({
  react: path.join(rootDir, 'node_modules/react'),
  'react-dom': path.join(rootDir, 'node_modules/react-dom'),
  'react-dom/client': path.join(rootDir, 'node_modules/react-dom/client'),
  'react/jsx-runtime': path.join(rootDir, 'node_modules/react/jsx-runtime'),
  'react/jsx-dev-runtime': path.join(
    rootDir,
    'node_modules/react/jsx-dev-runtime',
  ),
});

export const reactDedupe = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'react/jsx-dev-runtime',
];
