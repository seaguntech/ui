'use client';

import { docsComponentNavItems } from '@/lib/docs-nav';
import {
  Badge,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@seaguntech/ui';
import { FileText, MonitorPlay, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

const componentCommands = docsComponentNavItems.map((item) => ({
  name: item.name,
  label: item.title,
  isNew: item.isNew,
}));

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <div
        className="hidden h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-2 text-sm text-muted-foreground shadow-sm md:flex md:w-64 lg:w-80 items-center gap-2 cursor-pointer hover:bg-muted/80 transition-colors"
        onClick={() => setOpen(true)}
      >
        <span className="flex-1">Search documentation...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Links">
            <CommandItem
              onSelect={() => runCommand(() => router.push('/docs'))}
            >
              <FileText className="mr-2 h-4 w-4" />
              Docs
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/docs/components'))}
              keywords={['ui', 'registry', 'library']}
            >
              <Package className="mr-2 h-4 w-4" />
              Components
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push('/docs/examples'))}
            >
              <MonitorPlay className="mr-2 h-4 w-4" />
              Examples
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Components">
            {componentCommands.map((item) => (
              <CommandItem
                key={item.name}
                value={item.label}
                keywords={
                  item.isNew
                    ? [item.name, 'component', 'new']
                    : [item.name, 'component']
                }
                onSelect={() =>
                  runCommand(() => router.push(`/docs/components/${item.name}`))
                }
              >
                <Package className="mr-2 h-4 w-4" />
                <span className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.isNew ? (
                    <Badge
                      variant="new"
                      className="h-5 rounded-full px-2 text-[10px] tracking-wide"
                    >
                      New
                    </Badge>
                  ) : null}
                </span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
