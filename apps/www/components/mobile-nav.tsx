'use client';

import { Button } from '@seaguntech/ui';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center md:hidden">
      <Button
        variant="ghost"
        className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Image
          src="/images/tran-logo.png"
          alt="Seaguntech logo"
          width={24}
          height={24}
          className="h-6 w-6 rounded-sm"
        />
        <span className="font-bold">Seaguntech UI</span>
      </Link>
    </div>
  );
}
