'use client';

import { docsSidebarSections } from '@/lib/docs-nav';
import { Badge, cn } from '@seaguntech/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function DocsSidebarNav() {
  const pathname = usePathname();

  return (
    <div className="w-full">
      {docsSidebarSections.map((section) => (
        <div key={section.title} className="pb-4">
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            {section.title}
          </h4>
          {section.items.length > 0 && (
            <div className="grid grid-flow-row auto-rows-max text-sm">
              {section.items.map((subItem) => (
                <Link
                  key={subItem.href}
                  href={subItem.href}
                  className={cn(
                    'group flex w-full items-center justify-between rounded-md border border-transparent px-2 py-1 hover:underline',
                    pathname === subItem.href
                      ? 'font-medium text-foreground bg-accent/50'
                      : 'text-muted-foreground',
                  )}
                >
                  <span>{subItem.title}</span>
                  {subItem.isNew ? (
                    <Badge
                      variant="new"
                      className="h-5 rounded-full px-2 text-[10px] tracking-wide"
                    >
                      New
                    </Badge>
                  ) : null}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
