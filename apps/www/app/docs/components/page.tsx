import { CopyPageButton } from '@/components/copy-page-button';
import { docsComponentNavItems } from '@/lib/docs-nav';
import { getUiItems } from '@/lib/registry';
import { Badge } from '@seaguntech/ui';
import Link from 'next/link';

export default function DocsPage() {
  const items = getUiItems();
  const itemMap = new Map(items.map((item) => [item.name, item]));
  const componentEntries = docsComponentNavItems.flatMap((entry) => {
    const item = itemMap.get(entry.name);

    if (!item) {
      return [];
    }

    return [{ entry, item }];
  });
  const columnsCount = 3;
  const itemsPerColumn = Math.ceil(componentEntries.length / columnsCount);
  const componentColumns = Array.from({ length: columnsCount }, (_, index) =>
    componentEntries.slice(
      index * itemsPerColumn,
      (index + 1) * itemsPerColumn,
    ),
  ).filter((column) => column.length > 0);

  return (
    <div className="space-y-10 pr-2">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold tracking-tight">Components</h1>
          <p className="text-muted-foreground text-lg max-w-[500px]">
            Explore all the components available in the library.
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <CopyPageButton />
        </div>
      </div>

      <div className="mt-12 grid w-full max-w-[920px] grid-cols-1 gap-x-16 md:grid-cols-2 xl:grid-cols-3">
        {componentColumns.map((column, columnIndex) => (
          <div key={columnIndex} className="space-y-1.5">
            {column.map(({ entry, item }) => (
              <Link
                href={`/docs/components/${item.name}`}
                key={item.name}
                className="group block"
              >
                <div className="flex items-center gap-2 py-1.5 text-base font-medium text-foreground/95 transition-colors hover:text-foreground">
                  <span>
                    {item.name
                      .split('-')
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(' ')}
                  </span>
                  {entry.isNew ? (
                    <Badge
                      variant="new"
                      className="h-5 rounded-full px-2 text-[10px] tracking-wide"
                    >
                      New
                    </Badge>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-10 border-t mt-12">
        <Link href="/docs/registry">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            ← Registry Setup
          </div>
        </Link>
        <Link href="/docs/components/badge">
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
            Badge →
          </div>
        </Link>
      </div>
    </div>
  );
}
