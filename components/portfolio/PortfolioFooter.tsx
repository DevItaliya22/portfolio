'use client';

import { socialLinks } from '@/lib/info';
import LiveTime from '@/components/ui/LiveTime';
import PageViews from '@/components/ui/PageViews';
import { FileText } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function PortfolioFooter() {
  const footerLinks = socialLinks.filter((link) =>
    ['Github', 'Twitter', 'Linkedin', 'Email', 'Instagram'].includes(link.label)
  );

  return (
    <footer className="mt-16 mb-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <TooltipProvider delayDuration={200}>
            {footerLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Tooltip key={link.label}>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith('mailto:') ? undefined : '_blank'
                      }
                      rel={
                        link.href.startsWith('mailto:')
                          ? undefined
                          : 'noopener noreferrer'
                      }
                      className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                  >
                    {link.label}
                  </TooltipContent>
                </Tooltip>
              );
            })}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://resume.devitaliya.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <FileText className="h-5 w-5 shrink-0" aria-hidden />
                  
                </a>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
              >
                Resume
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <LiveTime />
          <span
            className="w-1 h-1 rounded-full bg-neutral-400 dark:bg-neutral-600 shrink-0"
            aria-hidden
          />
          <PageViews />
        </div>
      </div>
    </footer>
  );
}
