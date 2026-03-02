import { PackageManagerTabs } from '@/components/package-manager-tabs';
import Link from 'next/link';

export default function DocsIndexPage() {
  return (
    <main className="space-y-12 pr-2 pb-16">
      <div className="space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Introduction</h1>
        <p className="max-w-[750px] text-lg text-muted-foreground leading-relaxed">
          Seaguntech UI is a component library and custom registry built on top
          of{' '}
          <a
            href="https://ui.shadcn.com"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 font-medium text-foreground"
          >
            shadcn/ui
          </a>{' '}
          to help you build multimodal agentic experiences faster. It provides
          pre-built components for AI interfaces, audio, and more.
        </p>
      </div>

      <div className="space-y-6">
        <p className="text-base text-foreground">
          Components are available via the{' '}
          <code className="bg-muted px-1.5 py-0.5 rounded-md text-sm font-mono">
            @seaguntech/cli
          </code>{' '}
          command.
        </p>

        <PackageManagerTabs command="@seaguntech/cli@latest components add <component>" />

        <p className="text-base text-foreground">
          For example, to install the{' '}
          <Link
            href="/docs/components/voice-button"
            className="underline underline-offset-4 font-medium"
          >
            Voice Button
          </Link>{' '}
          component, you can run:
        </p>

        <PackageManagerTabs command="@seaguntech/cli@latest components add voice-button" />
      </div>

      <div className="space-y-6">
        <p className="text-base text-foreground">
          Here are some basic examples of what you can achieve using components
          from Seaguntech UI.
        </p>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold inline-block tracking-tight mb-2">
            Voice Interfaces
          </h3>
          <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col items-center justify-center min-h-[300px] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px]">
            <div className="w-full max-w-md bg-background rounded-[12px] border shadow-sm overflow-hidden">
              <div className="p-4 border-b flex items-center gap-3">
                <div className="h-9 w-9 rounded-full border flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border-[1.5px] border-foreground/30 border-r-foreground animate-spin" />
                </div>
                <div>
                  <div className="font-medium">Customer Support</div>
                  <div className="text-xs text-muted-foreground">
                    Tap to start voice chat
                  </div>
                </div>
              </div>
              <div className="p-6 bg-muted/5 min-h-[160px] flex items-center justify-center">
                <div className="flex gap-1 items-center justify-center h-12">
                  {[1, 2, 3, 4, 3, 2, 1].map((i, index) => (
                    <div
                      key={index}
                      className="w-1.5 bg-foreground/80 rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"
                      style={{
                        height: `${i * 6}px`,
                        animationDelay: `${index * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="usage" className="space-y-4 pt-4 border-t mt-12">
        <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
        <p className="text-base text-muted-foreground">
          Browse the docs to explore available components and copy-ready
          examples.
        </p>
        <div className="flex flex-wrap gap-3 text-sm mt-4">
          <Link
            href="/docs/components"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            View components
          </Link>
          <Link
            href="/docs/examples"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View examples
          </Link>
        </div>
      </section>
    </main>
  );
}
