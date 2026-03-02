'use client';

import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@seaguntech/ui';
import { Check, Copy, Terminal } from 'lucide-react';
import { useState } from 'react';

interface PackageManagerTabsProps {
  command: string;
}

export function PackageManagerTabs({ command }: PackageManagerTabsProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('pnpm');

  const getCommand = (pm: string) => {
    switch (pm) {
      case 'npm':
        return `npx ${command}`;
      case 'yarn':
        return `yarn dlx ${command}`;
      case 'bun':
        return `bunx --bun ${command}`;
      case 'pnpm':
      default:
        return `pnpm dlx ${command}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getCommand(activeTab));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative rounded-lg border bg-muted/30 p-4">
      <Tabs defaultValue="pnpm" className="w-full" onValueChange={setActiveTab}>
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-foreground/10 text-foreground">
              <Terminal className="h-3 w-3" />
            </div>
            <TabsList className="h-8 bg-transparent p-0">
              {['pnpm', 'npm', 'yarn', 'bun'].map((pm) => (
                <TabsTrigger
                  key={pm}
                  value={pm}
                  className="rounded-md px-3 py-1.5 text-xs data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {pm}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-background"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
            <span className="sr-only">Copy command</span>
          </Button>
        </div>
        {['pnpm', 'npm', 'yarn', 'bun'].map((pm) => (
          <TabsContent key={pm} value={pm} className="mt-0">
            <code className="text-sm font-mono text-foreground">
              {getCommand(pm)}
            </code>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
