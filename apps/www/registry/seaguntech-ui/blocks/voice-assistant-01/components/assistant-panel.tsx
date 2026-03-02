import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Conversation, Message } from '@/components/ui/conversation';
import { VoiceButton } from '@/components/ui/voice-button';
import { Waveform } from '@/components/ui/waveform';
import * as React from 'react';

export function AssistantPanel() {
  const [isListening, setIsListening] = React.useState(false);

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Voice Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Waveform active={isListening} />
        <Conversation>
          <Message from="assistant">
            Hi! Ask me anything about your workspace.
          </Message>
          <Message from="user">Summarize yesterday&apos;s standup.</Message>
        </Conversation>
        <VoiceButton
          isListening={isListening}
          onToggle={() => setIsListening((state) => !state)}
        />
      </CardContent>
    </Card>
  );
}
