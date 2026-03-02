import { VoiceButton } from '@/components/ui/voice-button';
import * as React from 'react';

export function VoiceButtonDemo() {
  const [isListening, setIsListening] = React.useState(false);

  return (
    <VoiceButton
      isListening={isListening}
      onToggle={() => setIsListening((state) => !state)}
    />
  );
}
