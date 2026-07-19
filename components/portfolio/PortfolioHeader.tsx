'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const skills = [
  { name: 'React', icon: '/skills/react.svg' },
  { name: 'Next.js', icon: '/skills/next.svg' },
  { name: 'TypeScript', icon: '/skills/ts.svg' },
  { name: 'JavaScript', icon: '/skills/js.svg' },
  { name: 'Docker', icon: '/skills/docker.svg' },
  { name: 'Prisma', icon: '/skills/prisma.svg', darkInvert: true },
  { name: 'PostgreSQL', icon: '/skills/pg.svg' },
];

/** true = display can show HDR/EDR right now, false = it can't, null = unknown (SSR) */
function useEdrDisplay() {
  const [edr, setEdr] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(dynamic-range: high)');
    setEdr(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEdr(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return edr;
}

export default function PortfolioHeader() {
  const edr = useEdrDisplay();
  return (
    <header className="flex justify-between items-start gap-8 mb-16">
      <div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 text-neutral-800 dark:text-neutral-200">
          hi, dev here
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-lg mb-3">
          21 · full-stack engineer
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <TooltipProvider delayDuration={0}>
            {skills.map(({ name, icon, darkInvert }) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <span
                    className={`inline-flex cursor-default ${darkInvert ? 'dark:bg-white dark:rounded dark:p-0.5' : ''}`}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </span>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-transparent border-0 p-0 text-neutral-600 dark:text-neutral-400 text-sm font-medium"
                >
                  {name}
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <ThemeToggle />
        {/* PNGs carry a Rec.2100 PQ ICC profile so white renders as HDR
            superwhite on EDR displays — `unoptimized` keeps next/image from
            re-encoding and stripping the profile. */}
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex cursor-default">
                <Image
                  src="/odsy-dark-hdr.png"
                  alt="Dev Italiya"
                  width={80}
                  height={80}
                  unoptimized
                  className="hidden dark:block rounded-full object-cover w-16 h-16 md:w-20 md:h-20"
                />
                <Image
                  src="/odsy-light-hdr.png"
                  alt="Dev Italiya"
                  width={80}
                  height={80}
                  unoptimized
                  className="dark:hidden rounded-full object-cover w-16 h-16 md:w-20 md:h-20"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent
              side="bottom"
              align="end"
              className="max-w-[280px] bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 text-xs leading-relaxed p-3"
            >
              <p className="font-medium text-neutral-900 dark:text-white mb-1">
                this logo is HDR ⚡
              </p>
              <p>
                its white pixels are tagged as Rec.2100 PQ — brighter than the
                page&apos;s white.
              </p>
              <p className="mt-1">
                {edr
                  ? 'your display supports EDR, so it should be glowing right now ✨'
                  : 'your display doesn’t do EDR — on a MacBook / iPhone / HDR screen it literally glows.'}
              </p>
              <p className="mt-1 text-neutral-500">
                intentional, not a rendering bug :)
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
