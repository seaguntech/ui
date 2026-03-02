import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import * as React from 'react';

export function TabsDemo() {
  return (
    <Card className="max-w-lg">
      <CardHeader>
        <CardTitle>Workspace</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-3 text-sm">
            Team productivity is up this week.
          </TabsContent>
          <TabsContent value="activity" className="pt-3 text-sm">
            12 actions completed in the last 24h.
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
