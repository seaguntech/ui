import { ComponentPlayground } from '@/components/component-playground';
import { getRegistryItem } from '@/lib/registry';
import { notFound } from 'next/navigation';

export default async function ViewPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const item = getRegistryItem(name);

  if (!item) {
    notFound();
  }

  return (
    <main className="bg-background flex min-h-svh items-center justify-center p-4">
      <ComponentPlayground name={name} />
    </main>
  );
}
