'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PortfolioAbout() {
  return (
    <section className="mb-16">
      <h2 className="text-lg font-semibold mb-4">about</h2>
      <div className="space-y-5 text-neutral-500 leading-relaxed">
        <p>
          currently building a B2B product in the customer loyalty and retention
          space —{' '}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-baseline gap-1">
                  <a
                    href="https://dy.devitaliya.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors underline decoration-neutral-600 underline-offset-2"
                  >
                    landing
                  </a>
                  <span className="text-neutral-600 text-xs cursor-default">
                    (hover)
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="max-w-xs bg-neutral-800 text-neutral-200 border border-neutral-700"
              >
                DY — we work with D2C and B2C clients. Customer loyalty,
                retention, referral programs, gamified solutions. Point-based
                loyalty system and more.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <p className="text-neutral-500">
          built a startup with{' '}
          <a
            href="https://github.com/AshishViradiya153"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors underline decoration-neutral-600 underline-offset-2"
          >
            @AshishViradiya153
          </a>
          {' · '}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex items-baseline gap-1">
                  <a
                    href="https://sendpaper.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-white transition-colors underline decoration-neutral-600 underline-offset-2"
                  >
                    Sendpaper
                  </a>
                  <span className="text-neutral-600 text-xs cursor-default">
                    (hover)
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="max-w-xs bg-neutral-800 text-neutral-200 border border-neutral-700"
              >
                Sendpaper — secure document sharing with others. Org handling,
                dataroom sharing, link creation with filters, and more.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
        <p>
          i&apos;ve built multiple admin dashboards, fix bugs for companies as a
          freelancer, and work on real-time systems. local-first is a passion—i
          love learning and building with sync engines, offline-first flows, and
          doc handling.
        </p>
        <p>available for freelance.</p>
      </div>
    </section>
  );
}
