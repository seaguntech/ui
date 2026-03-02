'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface GenerativeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function GenerativeContainer({
  children,
  className,
  active = true,
  ...props
}: GenerativeContainerProps) {
  return (
    <div
      className={cn('relative rounded-xl p-[1px] overflow-hidden', className)}
      {...props}
    >
      {active && (
        <div className="absolute inset-0 z-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,transparent_75%,hsl(var(--primary))_100%)] animate-[spin_3s_linear_infinite]" />
      )}
      <div className="relative z-10 rounded-[10px] bg-background h-full w-full">
        {children}
      </div>
    </div>
  );
}
