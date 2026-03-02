'use client';

import { Github } from 'lucide-react';
import { useEffect, useState } from 'react';

export function GithubStars() {
  const [stars, setStars] = useState<string>('0');

  useEffect(() => {
    fetch('https://api.github.com/repos/seaguntech/ui')
      .then((res) => res.json())
      .then((data) => {
        if (data.stargazers_count !== undefined) {
          const formatted =
            data.stargazers_count >= 1000
              ? (data.stargazers_count / 1000).toFixed(1) + 'k'
              : data.stargazers_count.toString();
          setStars(formatted);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <div className="flex items-center">
      <div className="h-4 w-px bg-border mx-3" />
      <a
        href="https://github.com/seaguntech/ui"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors mr-2"
      >
        <Github className="h-[20px] w-[20px]" strokeWidth={2} />
        <span className="hidden sm:inline-block text-[14px]">{stars}</span>
        <span className="sr-only">GitHub</span>
      </a>
    </div>
  );
}
