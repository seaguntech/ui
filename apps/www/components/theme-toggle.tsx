'use client';

import { Button } from '@seaguntech/ui';
import { MoonStar } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-9 w-9 px-0 hover:bg-transparent text-foreground"
    >
      <MoonStar className="h-[20px] w-[20px]" strokeWidth={2} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
