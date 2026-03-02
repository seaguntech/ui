'use client';

import { cn } from '../lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Mic, Send } from 'lucide-react';
import React, { useRef, useState } from 'react';

export interface VoiceInputBarProps {
  onSend?: (text: string) => void;
  onVoiceStart?: () => void;
  onVoiceStop?: () => void;
  placeholder?: string;
  className?: string;
}

export function VoiceInputBar({
  onSend,
  onVoiceStart,
  onVoiceStop,
  placeholder = 'Message or tap mic...',
  className,
}: VoiceInputBarProps) {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleListen = () => {
    if (isListening) {
      setIsListening(false);
      onVoiceStop?.();
    } else {
      setIsListening(true);
      onVoiceStart?.();
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSend?.(text);
      setText('');
    }
  };

  return (
    <div
      className={cn(
        'relative flex w-full max-w-2xl items-center rounded-full border bg-background px-2 py-1.5 shadow-sm transition-all focus-within:ring-1 focus-within:ring-ring',
        isListening && 'ring-1 ring-primary/50 shadow-md',
        className,
      )}
    >
      <button
        type="button"
        onClick={toggleListen}
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
          isListening
            ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]'
            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground',
        )}
      >
        <Mic className={cn('h-5 w-5', isListening && 'animate-pulse')} />
      </button>

      <div className="relative flex-1 overflow-hidden px-3">
        <AnimatePresence mode="popLayout">
          {isListening ? (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex h-10 items-center justify-center space-x-1"
            >
              {[1, 2, 3, 4, 3, 2, 1, 2, 3, 4, 2].map((i, index) => (
                <motion.div
                  key={index}
                  animate={{
                    height: ['10%', '100%', '10%'],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                  }}
                  className="w-1 rounded-full bg-foreground"
                />
              ))}
              <span className="ml-4 text-sm font-medium animate-pulse text-muted-foreground">
                Listening...
              </span>
            </motion.div>
          ) : (
            <motion.input
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={placeholder}
              className="flex h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {!isListening && text.length > 0 && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            type="button"
            onClick={handleSend}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors mr-1"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
