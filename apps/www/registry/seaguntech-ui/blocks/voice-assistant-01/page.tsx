import { AssistantPanel } from './components/assistant-panel';
import * as React from 'react';

export default function VoiceAssistantBlockPage() {
  return (
    <main className="bg-background flex min-h-svh items-center justify-center p-4">
      <AssistantPanel />
    </main>
  );
}
