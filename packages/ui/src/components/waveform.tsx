import { cn } from '../lib/utils';
import * as React from 'react';

export interface WaveformProps {
  bars?: number;
  active?: boolean;
  className?: string;
}

export function Waveform({
  bars = 24,
  active = false,
  className,
}: WaveformProps) {
  const data = React.useMemo(() => {
    return Array.from({ length: bars }, (_, index) => {
      const cycle = (index % 7) + 1;
      return cycle / 7;
    });
  }, [bars]);

  return (
    <div
      data-slot="waveform"
      className={cn('flex h-10 items-end gap-1 rounded-md px-2', className)}
    >
      {data.map((value, index) => (
        <div
          key={index}
          className={cn(
            'bg-primary/80 w-1 rounded-full transition-all',
            active ? 'animate-pulse' : '',
          )}
          style={{ height: `${Math.max(value * 100, 20)}%` }}
        />
      ))}
    </div>
  );
}
