import { getExampleItems } from '@/lib/registry';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@seaguntech/ui';
import Link from 'next/link';

export default function ExamplesPage() {
  const examples = getExampleItems();

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Examples</h1>
      <p className="text-fg-muted text-sm">
        Drop-in usage examples for common component combinations.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {examples.map((item) => (
          <Card key={item.name}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-fg-muted">
              <code className="block rounded-md bg-muted p-2">
                /r/{item.name}.json
              </code>
              <Link
                href={`/docs/components/${item.name}`}
                className="underline"
              >
                View install instructions
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
