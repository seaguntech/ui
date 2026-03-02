import { cn } from '../lib/utils';
import * as React from 'react';

export function Conversation({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="conversation"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
}

export interface MessageProps extends React.ComponentProps<'div'> {
  from?: 'user' | 'assistant';
}

export function Message({
  from = 'assistant',
  className,
  ...props
}: MessageProps) {
  return (
    <div
      data-slot="message"
      className={cn(
        'max-w-[80%] rounded-xl px-3 py-2 text-sm',
        from === 'user'
          ? 'bg-primary text-primary-foreground ml-auto'
          : 'bg-muted text-foreground',
        className,
      )}
      {...props}
    />
  );
}
