import { ComponentPlayground } from '@/components/component-playground';
import { ComponentPreview } from '@/components/component-preview';
import { CopyPageButton } from '@/components/copy-page-button';
import { InstallationTabs } from '@/components/installation-tabs';
import { getComponentDocNeighbors, isDocsComponentNew } from '@/lib/docs-nav';
import { getRegistryItem } from '@/lib/registry';
import { getRegistrySource } from '@/lib/registry-source';
import { getRegistryItemUrl } from '@/lib/registry-url';
import { highlightCode } from '@/lib/shiki';
import { Badge, Button } from '@seaguntech/ui';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

function commandFor(pm: 'npm' | 'pnpm' | 'yarn' | 'bun', itemUrl: string) {
  if (pm === 'npm') return `npx shadcn@latest add "${itemUrl}"`;
  if (pm === 'pnpm') return `pnpm dlx shadcn@latest add "${itemUrl}"`;
  if (pm === 'yarn') return `yarn dlx shadcn@latest add "${itemUrl}"`;
  return `bunx --bun shadcn@latest add "${itemUrl}"`;
}

export default async function ComponentDocPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = getRegistryItem(name);

  if (!item) {
    notFound();
  }

  const { previous, next } = getComponentDocNeighbors(item.name);
  const isNew = isDocsComponentNew(item.name);
  const sourceFiles = await getRegistrySource(item.name);
  const registryItemUrl = getRegistryItemUrl(item.name);
  const title = item.name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const rawCode = sourceFiles[0]?.content || 'No source code available.';
  const highlightedCode = await highlightCode(rawCode);
  const cliCmd = commandFor('pnpm', registryItemUrl);
  const highlightedCli = await highlightCode(cliCmd, 'bash');
  const manualCmd = `// Copy and paste the following code into your project.\n\n${rawCode}`;
  const highlightedManual = await highlightCode(manualCmd, 'tsx');

  return (
    <div className="space-y-10 pr-2">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-semibold tracking-tight">{title}</h1>
            <Badge variant="outline" className="ml-2 mt-1">
              {item.type.replace('registry:', '')}
            </Badge>
            {isNew ? (
              <Badge
                variant="new"
                className="mt-1 rounded-full px-2 text-[10px] tracking-wide"
              >
                New
              </Badge>
            ) : null}
          </div>
          <p className="text-muted-foreground text-lg max-w-[600px]">
            {item.description}
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-2">
          <CopyPageButton />
          {previous ? (
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
            >
              <Link
                href={previous.href}
                aria-label={`Previous: ${previous.title}`}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
              disabled
              aria-label="No previous component"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
          {next ? (
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
            >
              <Link href={next.href} aria-label={`Next: ${next.title}`}>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full shadow-sm"
              disabled
              aria-label="No next component"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8">
        <ComponentPreview
          name={item.name}
          preview={<ComponentPlayground name={item.name} />}
          code={highlightedCode}
        />
      </div>

      <div id="installation" className="space-y-4 pt-8">
        <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
        <InstallationTabs cli={highlightedCli} manual={highlightedManual} />
      </div>

      {item.dependencies?.length || item.registryDependencies?.length ? (
        <div id="dependencies" className="space-y-4 pt-8 border-t mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">
            Dependencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {item.dependencies?.length ? (
              <div className="p-4 rounded-lg border bg-muted/20">
                <h3 className="font-medium mb-3">NPM Packages</h3>
                <div className="flex flex-wrap gap-2">
                  {item.dependencies.map((dep) => (
                    <Badge key={dep} variant="secondary">
                      {dep}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
            {item.registryDependencies?.length ? (
              <div className="p-4 rounded-lg border bg-muted/20">
                <h3 className="font-medium mb-3">Registry Components</h3>
                <div className="flex flex-wrap gap-2">
                  {item.registryDependencies.map((dep) => (
                    <Link href={`/docs/components/${dep}`} key={dep}>
                      <Badge
                        variant="outline"
                        className="hover:bg-accent cursor-pointer"
                      >
                        {dep}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex items-center justify-between pt-10 border-t mt-12">
        {previous ? (
          <Link href={previous.href}>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              ← {previous.title}
            </div>
          </Link>
        ) : (
          <Link href="/docs/components">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              ← All Components
            </div>
          </Link>
        )}
        {next ? (
          <Link href={next.href}>
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              {next.title} →
            </div>
          </Link>
        ) : (
          <Link href="/docs/components">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
              All Components →
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
