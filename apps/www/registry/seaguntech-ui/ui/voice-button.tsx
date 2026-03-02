import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Mic, MicOff } from 'lucide-react';
import * as React from 'react';

export interface VoiceButtonProps {
  isListening?: boolean;
  onToggle?: () => void;
  disabled?: boolean;
  className?: string;
}

export function VoiceButton({
  isListening = false,
  onToggle,
  disabled,
  className,
}: VoiceButtonProps) {
  return (
    <Button
      type="button"
      variant={isListening ? 'destructive' : 'default'}
      className={cn('min-w-36 gap-2', className)}
      onClick={onToggle}
      disabled={disabled}
    >
      {isListening ? <MicOff /> : <Mic />}
      {isListening ? 'Stop listening' : 'Start speaking'}
    </Button>
  );
}
