import { getBlockItems } from '@/lib/registry';
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@seaguntech/ui';
import Link from 'next/link';

export default function BlocksPage() {
  const blocks = getBlockItems();

  return (
    <main className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Blocks</h1>
      <p className="text-fg-muted text-sm">
        Composable block recipes built on top of registry components.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {blocks.map((item) => (
          <Card key={item.name}>
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>{item.name}</CardTitle>
                {(item.categories ?? []).map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
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
