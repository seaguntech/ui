'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@seaguntech/ui';

interface InstallationTabsProps {
  cli: string;
  manual: string;
}

export function InstallationTabs({ cli, manual }: InstallationTabsProps) {
  return (
    <Tabs defaultValue="cli" className="relative mt-6 w-full">
      <div className="flex items-center justify-between pb-3">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="cli"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            CLI
          </TabsTrigger>
          <TabsTrigger
            value="manual"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            Manual
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="cli">
        <div className="w-full rounded-md bg-zinc-950 p-4 border flex items-center justify-between text-sm">
          <div
            className="text-zinc-50 font-mono w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: cli }}
          />
        </div>
      </TabsContent>
      <TabsContent value="manual">
        <div className="w-full rounded-md bg-zinc-950 p-4 border max-h-[400px] overflow-auto text-sm">
          <div
            className="text-zinc-50 font-mono"
            dangerouslySetInnerHTML={{ __html: manual }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
