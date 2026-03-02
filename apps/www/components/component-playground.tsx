'use client';

import {
  Badge,
  BentoGrid,
  BentoGridItem,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Conversation,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  GenerativeContainer,
  Input,
  Label,
  MagneticButton,
  Message,
  ScrollArea,
  Separator,
  SpotlightCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  VoiceButton,
  VoiceInputBar,
  Waveform,
} from '@seaguntech/ui';

type Props = {
  name: string;
};

export function ComponentPlayground({ name }: Props) {
  switch (name) {
    case 'button':
      return (
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </div>
      );
    case 'input':
      return (
        <div className="max-w-sm space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Type your name" />
        </div>
      );
    case 'label':
      return <Label htmlFor="email">Email address</Label>;
    case 'card':
      return (
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Project status</CardTitle>
            <CardDescription>Weekly snapshot</CardDescription>
          </CardHeader>
          <CardContent>Build pipeline is stable and passing.</CardContent>
        </Card>
      );
    case 'badge':
      return (
        <div className="flex gap-2">
          <Badge>Active</Badge>
          <Badge variant="secondary">Draft</Badge>
          <Badge variant="outline">Archived</Badge>
        </div>
      );
    case 'separator':
      return (
        <div className="max-w-sm space-y-3">
          <div>Top section</div>
          <Separator />
          <div>Bottom section</div>
        </div>
      );
    case 'textarea':
      return <Textarea className="max-w-md" placeholder="Write a summary..." />;
    case 'tabs':
      return (
        <Tabs defaultValue="overview" className="max-w-md">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="p-3 text-sm">
            Overview content
          </TabsContent>
          <TabsContent value="details" className="p-3 text-sm">
            Details content
          </TabsContent>
        </Tabs>
      );
    case 'dialog':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm action</DialogTitle>
              <DialogDescription>
                This is a demo dialog for registry preview.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary">Cancel</Button>
              <Button>Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case 'dropdown-menu':
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Open menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    case 'voice-button':
      return <VoiceButton />;
    case 'waveform':
      return <Waveform active className="max-w-md" />;
    case 'conversation':
      return (
        <Conversation className="max-w-md">
          <Message from="assistant">Hello, how can I help?</Message>
          <Message from="user">Show me the latest report.</Message>
        </Conversation>
      );
    case 'dialog-demo':
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Open dialog</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish changes?</DialogTitle>
              <DialogDescription>
                This action will make your content visible to users.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary">Cancel</Button>
              <Button>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    case 'voice-button-demo':
      return <VoiceButton isListening={false} />;
    case 'tabs-demo':
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
    case 'voice-assistant-01':
      return (
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle>Voice Assistant</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Waveform active />
            <Conversation>
              <Message from="assistant">
                Hi! Ask me anything about your workspace.
              </Message>
              <Message from="user">Summarize yesterday&apos;s standup.</Message>
            </Conversation>
            <VoiceButton isListening />
          </CardContent>
        </Card>
      );
    case 'workspace-quick-actions-01':
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Workspace Quick Actions</CardTitle>
            <Badge>Beta</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="tasks">
              <TabsList>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
              <TabsContent value="tasks" className="pt-3 text-sm">
                Prioritize onboarding checklist and release notes.
              </TabsContent>
              <TabsContent value="team" className="pt-3 text-sm">
                Review teammate updates and assign next actions.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      );
    case 'voice-input-bar':
      return <VoiceInputBar onSend={(t) => console.log(t)} />;
    case 'spotlight-card':
      return (
        <SpotlightCard className="w-[300px] h-[200px] flex items-center justify-center p-6">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Hover me</h3>
            <p className="text-sm text-muted-foreground">
              The spotlight effect will follow your cursor.
            </p>
          </div>
        </SpotlightCard>
      );
    case 'generative-container':
      return (
        <GenerativeContainer className="w-[400px] h-[150px]">
          <div className="w-full h-full p-6 flex items-center justify-center text-sm text-muted-foreground">
            AI is generating content...
          </div>
        </GenerativeContainer>
      );
    case 'magnetic-button':
      return (
        <MagneticButton variant="default" size="lg">
          Hover me
        </MagneticButton>
      );
    case 'bento-grid':
      return (
        <BentoGrid className="max-w-4xl">
          {[1, 2, 3, 4, 5].map((i) => (
            <BentoGridItem
              key={i}
              title={`Feature ${i}`}
              description="A beautiful feature to display."
              className={i === 1 || i === 4 ? 'md:col-span-2' : ''}
            />
          ))}
        </BentoGrid>
      );
    case 'command':
      return (
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search Emoji</CommandItem>
              <CommandItem>Calculator</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      );
    case 'scroll-area':
      return (
        <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
          Jokester began sneaking into the castle in the middle of the night and
          leaving jokes all over the place: under the king&apos;s pillow, in his
          soup, even in the royal toilet. The king was furious, but he
          couldn&apos;t seem to stop Jokester. And then, one day, the people of
          the kingdom discovered that the jokes left by Jokester were so funny
          that they couldn&apos;t help but laugh. And once they started
          laughing, they couldn&apos;t stop.
        </ScrollArea>
      );
    default:
      return <div className="text-sm text-fg-muted">No preview available.</div>;
  }
}
