'use client';

import { Button } from '@seaguntech/ui';
import { Check, Link } from 'lucide-react';
import { useState } from 'react';

export function CopyPageButton() {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 shadow-sm rounded-full text-xs"
      onClick={onCopy}
    >
      {copied ? (
        <Check className="mr-2 h-3.5 w-3.5" />
      ) : (
        <Link className="mr-2 h-3.5 w-3.5" />
      )}
      {copied ? 'Copied' : 'Copy Page'}
    </Button>
  );
}
