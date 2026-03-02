'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@seaguntech/ui';
import * as React from 'react';

interface ComponentPreviewProps {
  name: string;
  preview: React.ReactNode;
  code: string;
}

export function ComponentPreview({
  name,
  preview,
  code,
}: ComponentPreviewProps) {
  return (
    <div
      className="group relative my-4 flex flex-col space-y-2"
      data-component-name={name}
    >
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-md border">
          <div className="flex min-h-[350px] w-full items-center justify-center p-10">
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,white,transparent)] z-[-1]"></div>
            {preview}
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto bg-zinc-950 p-4 relative text-sm border">
              <div
                className="text-zinc-50 font-mono"
                dangerouslySetInnerHTML={{ __html: code }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
