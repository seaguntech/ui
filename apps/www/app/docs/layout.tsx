import { DocsSidebarNav } from '@/components/docs-sidebar-nav';
import { ScrollArea } from '@seaguntech/ui';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="border-b">
      <div className="container mx-auto max-w-screen-2xl flex-1 items-start px-4 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-full py-6 pr-6 lg:py-8">
            <DocsSidebarNav />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_200px]">
          <div className="mx-auto w-full min-w-0">{children}</div>
          <div className="hidden text-sm xl:block">
            <div className="sticky top-16 -mt-10 pt-4">
              <ScrollArea className="pb-10">
                <div className="space-y-2">
                  <p className="font-medium">On This Page</p>
                  <ul className="m-0 list-none">
                    <li className="mt-0 pt-2">
                      <a
                        href="#installation"
                        className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      >
                        Installation
                      </a>
                    </li>
                    <li className="mt-0 pt-2">
                      <a
                        href="#usage"
                        className="inline-block no-underline transition-colors hover:text-foreground text-muted-foreground"
                      >
                        Usage
                      </a>
                    </li>
                  </ul>
                </div>
              </ScrollArea>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
