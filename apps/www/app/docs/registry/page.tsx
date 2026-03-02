import { getRegistryBaseUrl } from '@/lib/registry-url';
import { Card, CardContent, CardHeader, CardTitle } from '@seaguntech/ui';

export default function RegistryGuidePage() {
  const baseUrl = getRegistryBaseUrl();

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Registry Guide</h1>
      <p className="text-fg-muted text-sm">
        This project exposes a shadcn-compatible custom registry under{' '}
        <code>/r/*.json</code>.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Registry index</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <code className="block rounded-md bg-muted p-3">
            {baseUrl}/r/registries.json
          </code>
          <code className="block rounded-md bg-muted p-3">
            {baseUrl}/r/registry.json
          </code>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Install a component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <code className="block rounded-md bg-muted p-3">
            pnpm dlx shadcn@latest add {baseUrl}/r/button.json
          </code>
          <code className="block rounded-md bg-muted p-3">
            pnpm dlx shadcn@latest add @seaguntech/button
          </code>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Install blocks and examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <code className="block rounded-md bg-muted p-3">
            pnpm dlx shadcn@latest add
            {baseUrl}/r/voice-assistant-01.json
          </code>
          <code className="block rounded-md bg-muted p-3">
            pnpm dlx shadcn@latest add {baseUrl}/r/dialog-demo.json
          </code>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Build and validate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <code className="block rounded-md bg-muted p-3">
            pnpm build:registry
          </code>
          <code className="block rounded-md bg-muted p-3">
            pnpm validate:registry
          </code>
        </CardContent>
      </Card>
    </main>
  );
}
