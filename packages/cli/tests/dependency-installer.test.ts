import { inferExternalDependenciesFromFiles } from '../src/core/dependency-installer.js';
import { describe, expect, it } from 'vitest';

describe('inferExternalDependenciesFromFiles', () => {
  it('detects package imports from file content', () => {
    const dependencies = inferExternalDependenciesFromFiles([
      {
        path: 'lib/utils.ts',
        type: 'registry:lib',
        content:
          "import { clsx } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\n",
      },
      {
        path: 'ui/button.tsx',
        type: 'registry:ui',
        content:
          "import * as React from 'react';\nimport { Slot } from '@radix-ui/react-slot';\nimport { cn } from '@/lib/utils';\n",
      },
    ]);

    expect(dependencies).toContain('clsx');
    expect(dependencies).toContain('tailwind-merge');
    expect(dependencies).toContain('@radix-ui/react-slot');
    expect(dependencies).not.toContain('react');
  });
});
