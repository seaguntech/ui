'use client';

import { cn } from '@seaguntech/ui';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src="/images/tran-logo.png"
          alt="Seaguntech logo"
          width={24}
          height={24}
          className="h-6 w-6 rounded-sm"
        />
      </Link>
      <nav className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/docs"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname === '/docs' ? 'text-foreground' : 'text-foreground/60',
          )}
        >
          Docs
        </Link>
        <Link
          href="/docs/components"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/components')
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          Components
        </Link>
        <Link
          href="/docs/examples"
          className={cn(
            'transition-colors hover:text-foreground/80',
            pathname?.startsWith('/docs/examples')
              ? 'text-foreground'
              : 'text-foreground/60',
          )}
        >
          Examples
        </Link>
      </nav>
    </div>
  );
}
