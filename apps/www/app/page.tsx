import { Button, Card, CardContent } from '@seaguntech/ui';
import { Mic, Play } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex-1 bg-background/50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-500/10 via-background to-background" />

      <section className="relative z-10 space-y-6 pb-8 pt-12 md:pb-12 md:pt-24 lg:py-32">
        <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tighter max-w-[800px]">
            Components that you can customize and extend.
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Shadcn-compatible custom registry built on top of @seaguntech/ui.
            Provide beautiful, modern and multi-modal components.
          </p>
          <div className="flex space-x-4 mt-8">
            <Link href="/docs">
              <Button
                size="lg"
                className="h-12 px-8 font-medium rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Get Started
              </Button>
            </Link>
            <Link href="/docs/components">
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 rounded-full font-medium"
              >
                View Components
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto relative z-10 space-y-6 pb-16 pt-6 px-4">
        <div className="mx-auto grid max-w-[900px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-background/40 backdrop-blur-sm border-muted/50 overflow-hidden group hover:border-foreground/20 transition-colors shadow-sm hover:shadow-md">
            <CardContent className="p-6">
              <div className="flex h-[120px] items-center justify-center">
                <div className="flex items-end space-x-1 opacity-70 group-hover:opacity-100 transition-opacity">
                  {[4, 2, 5, 3, 6, 8, 4, 2, 7, 5, 2, 4].map((height, i) => (
                    <div
                      key={i}
                      className="w-1.5 rounded-t-sm bg-foreground/80 animate-pulse"
                      style={{
                        height: `${height * 6}px`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-6 space-y-1">
                <h3 className="font-medium text-sm">Speaking</h3>
                <p className="text-xs text-muted-foreground">
                  Live audio visualization.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/40 backdrop-blur-sm border-muted/50 overflow-hidden md:col-span-2 group hover:border-foreground/20 transition-colors shadow-sm hover:shadow-md">
            <CardContent className="p-6 h-full flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <Mic className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Customer Support</h3>
                    <p className="text-sm text-muted-foreground">
                      Tap to start voice chat
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between items-center bg-background rounded-lg p-3 border border-border/50 shadow-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Live Audio
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                  128 kbps
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/40 backdrop-blur-sm border-muted/50 overflow-hidden md:col-span-2 group hover:border-foreground/20 transition-colors shadow-sm hover:shadow-md">
            <CardContent className="p-6 h-full flex flex-col">
              <h3 className="font-medium text-sm mb-4 text-muted-foreground">
                No track selected
              </h3>
              <div className="flex-1 space-y-2 mt-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex items-center space-x-4 rounded-md p-2 transition-colors ${i === 2 ? 'bg-accent shadow-sm border border-border/50' : 'hover:bg-accent/50 cursor-pointer'}`}
                  >
                    {i === 2 ? (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 rounded-full bg-background border shadow-sm"
                      >
                        <Play className="h-3 w-3 ml-0.5" />
                      </Button>
                    ) : (
                      <span className="text-muted-foreground/50 w-6 text-center text-xs">
                        {i}
                      </span>
                    )}
                    <div className="flex-1">
                      <span
                        className={`font-mono text-xs ${i === 2 ? 'text-foreground' : 'text-muted-foreground'}`}
                      >
                        II - 0{i - 1}
                      </span>
                      {i === 2 && (
                        <div className="w-full bg-muted-foreground/20 h-0.5 mt-2 rounded-full overflow-hidden">
                          <div className="bg-foreground h-full w-[40%]" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-background/40 backdrop-blur-sm border-muted/50 overflow-hidden group hover:border-foreground/20 transition-colors shadow-sm hover:shadow-md">
            <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
              <div className="relative flex h-[140px] w-full items-center justify-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 blur-2xl opacity-40 animate-pulse" />
                <div className="absolute h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 shadow-[0_0_40px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute h-16 w-16 rounded-full border border-white/20 opacity-50 rotate-45" />
                <div className="absolute h-16 w-16 rounded-full border border-white/20 opacity-50 -rotate-45" />
              </div>
              <div className="mt-2 space-y-1">
                <h3 className="font-medium text-sm">Agent Orbs</h3>
                <p className="text-xs text-muted-foreground">
                  Interactive visualization
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
