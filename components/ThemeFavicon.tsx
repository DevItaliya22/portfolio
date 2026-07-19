'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

/** Keeps the tab favicon in sync with the site theme. Skips /dino — the game owns the favicon there. */
export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/dino' || !resolvedTheme) return;
    const favicon = document.querySelector<HTMLLinkElement>(
      'link[rel="shortcut icon"]'
    );
    if (favicon) {
      favicon.setAttribute(
        'href',
        resolvedTheme === 'dark' ? '/odsy-dark-hdr.png' : '/odsy-light-hdr.png'
      );
    }
  }, [resolvedTheme, pathname]);

  return null;
}
