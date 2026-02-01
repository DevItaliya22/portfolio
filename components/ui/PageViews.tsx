'use client';

import { useEffect, useState } from 'react';

export default function PageViews() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function incrementAndFetch() {
      try {
        const res = await fetch('/api/main-page/increment', { method: 'POST' });
        const data = await res.json();
        if (mounted && typeof data.views === 'number') {
          setViews(data.views);
        }
      } catch {
        if (mounted) setViews(null);
      }
    }

    incrementAndFetch();
    return () => {
      mounted = false;
    };
  }, []);

  if (views === null) return null;

  return (
    <span className="text-xs text-neutral-500 font-mono">
      {views} {views === 1 ? 'view' : 'views'}
    </span>
  );
}
